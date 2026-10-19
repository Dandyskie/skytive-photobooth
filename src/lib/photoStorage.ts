import fs from "fs";
import path from "path";
import os from "os";

export interface StoredPhotoItem {
  id: string;
  dataUrl: string;
  buffer?: Buffer;
  mimeType?: string;
  createdAt: number;
  expiresAt: number;
}

// Batas waktu foto aktif di penyimpanan (30 menit = 1.800.000 ms)
export const PHOTO_TTL_MS = 30 * 60 * 1000;

// Batas maksimal antrean foto di memori/cache untuk mencegah leak
export const MAX_PHOTO_CAPACITY = 50;

declare global {
  var _photosStoreMap: Map<string, StoredPhotoItem> | undefined;
}

/**
 * Direktori cache lokal untuk menjamin konsistensi multi-worker Next.js
 */
function getCacheDir(): string {
  try {
    const localDir = path.join(process.cwd(), ".photos-cache");
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    return localDir;
  } catch {
    // Fallback ke os tmpdir jika cwd read-only
    const tmpDir = path.join(os.tmpdir(), "skytive-photobooth-cache");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

function sanitizeId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, "");
}

/**
 * Mendapatkan instance Map memori singleton di globalThis Node.js
 */
export function getPhotoStore(): Map<string, StoredPhotoItem> {
  if (!globalThis._photosStoreMap) {
    globalThis._photosStoreMap = new Map();
  }
  return globalThis._photosStoreMap;
}

/**
 * Menyimpan foto ke RAM & Cache Disk dengan TTL 30 menit dan auto-eviction
 */
export function savePhotoToMemory(id: string, dataUrl: string): StoredPhotoItem {
  const store = getPhotoStore();
  const now = Date.now();
  const safeId = sanitizeId(id);

  // 1. Bersihkan foto-foto yang sudah kedaluwarsa
  cleanupExpiredPhotos();

  // 2. Jika kapasitas memori melebihi batas (50 foto), hapus foto paling awal (FIFO)
  if (store.size >= MAX_PHOTO_CAPACITY) {
    const oldestKey = store.keys().next().value;
    if (oldestKey) {
      store.delete(oldestKey);
    }
  }

  // Parse MIME type & Base64
  const mimeMatch = dataUrl.match(/^data:([^;]+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/png";
  const commaIdx = dataUrl.indexOf(",");
  const base64Data = commaIdx !== -1 ? dataUrl.slice(commaIdx + 1) : dataUrl;
  let buffer: Buffer | undefined;

  try {
    buffer = Buffer.from(base64Data, "base64");
  } catch (err) {
    console.error("Gagal membuat buffer foto:", err);
  }

  const item: StoredPhotoItem = {
    id: safeId,
    dataUrl,
    buffer,
    mimeType,
    createdAt: now,
    expiresAt: now + PHOTO_TTL_MS,
  };

  // Simpan ke RAM
  store.set(safeId, item);

  // Simpan ke Disk Cache agar dapat diakses oleh worker thread Next.js lain
  if (buffer) {
    try {
      const cacheDir = getCacheDir();
      const imgPath = path.join(cacheDir, `${safeId}.png`);
      const metaPath = path.join(cacheDir, `${safeId}.json`);

      fs.writeFileSync(imgPath, buffer);
      fs.writeFileSync(
        metaPath,
        JSON.stringify({
          id: safeId,
          mimeType,
          createdAt: now,
          expiresAt: now + PHOTO_TTL_MS,
        }),
        "utf-8"
      );
    } catch (fsErr) {
      console.warn("Gagal menulis disk cache sementara:", fsErr);
    }
  }

  return item;
}

/**
 * Mengambil foto dari RAM / Disk Cache berdasarkan ID
 * Mengembalikan null jika foto tidak ada atau sudah kedaluwarsa
 */
export function getPhotoFromMemory(id: string): StoredPhotoItem | null {
  const safeId = sanitizeId(id);
  const store = getPhotoStore();
  const now = Date.now();

  // 1. Cek di RAM terlebih dahulu
  const item = store.get(safeId);
  if (item) {
    if (now > item.expiresAt) {
      store.delete(safeId);
      // Hapus juga file jika ada
      try {
        const cacheDir = getCacheDir();
        fs.unlinkSync(path.join(cacheDir, `${safeId}.png`));
        fs.unlinkSync(path.join(cacheDir, `${safeId}.json`));
      } catch {}
      return null;
    }
    return item;
  }

  // 2. Jika tidak ada di RAM (karena beda worker thread Next.js), cek di Disk Cache
  try {
    const cacheDir = getCacheDir();
    const metaPath = path.join(cacheDir, `${safeId}.json`);
    const imgPath = path.join(cacheDir, `${safeId}.png`);

    if (fs.existsSync(metaPath) && fs.existsSync(imgPath)) {
      const metaRaw = fs.readFileSync(metaPath, "utf-8");
      const meta = JSON.parse(metaRaw);

      if (now > meta.expiresAt) {
        try {
          fs.unlinkSync(metaPath);
          fs.unlinkSync(imgPath);
        } catch {}
        return null;
      }

      const buffer = fs.readFileSync(imgPath);
      const mimeType = meta.mimeType || "image/png";
      const dataUrl = `data:${mimeType};base64,${buffer.toString("base64")}`;

      const recoveredItem: StoredPhotoItem = {
        id: safeId,
        dataUrl,
        buffer,
        mimeType,
        createdAt: meta.createdAt,
        expiresAt: meta.expiresAt,
      };

      // Masukkan kembali ke RAM untuk request berikutnya
      store.set(safeId, recoveredItem);
      return recoveredItem;
    }
  } catch (fsErr) {
    console.warn("Gagal membaca disk cache:", fsErr);
  }

  return null;
}

/**
 * Menghapus semua foto yang masa berlakunya sudah lewat dari 30 menit
 */
export function cleanupExpiredPhotos(): void {
  const store = getPhotoStore();
  const now = Date.now();

  // Bersihkan RAM
  for (const [key, value] of store.entries()) {
    if (now > value.expiresAt) {
      store.delete(key);
    }
  }

  // Bersihkan Disk Cache
  try {
    const cacheDir = getCacheDir();
    const files = fs.readdirSync(cacheDir);
    for (const file of files) {
      if (file.endsWith(".json")) {
        const metaPath = path.join(cacheDir, file);
        try {
          const raw = fs.readFileSync(metaPath, "utf-8");
          const meta = JSON.parse(raw);
          if (now > meta.expiresAt) {
            fs.unlinkSync(metaPath);
            const base = file.replace(/\.json$/, "");
            const imgPath = path.join(cacheDir, `${base}.png`);
            if (fs.existsSync(imgPath)) {
              fs.unlinkSync(imgPath);
            }
          }
        } catch {}
      }
    }
  } catch {}
}

