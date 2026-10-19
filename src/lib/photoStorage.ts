/**
 * ============================================================================
 * PHOTO STORAGE SERVICE (IN-MEMORY / EPHEMERAL RAM)
 * ============================================================================
 * Fungsi: Menyimpan soft file foto strip HANYA di memori RAM server secara sementara.
 * Sifat:
 *   - 0 Bytes di harddisk laptop (tidak pernah menulis file fisik ke perangkat).
 *   - Memiliki batas kedaluwarsa (TTL) otomatis 30 menit.
 *   - Memiliki batas kapasitas (maksimal 50 foto di RAM, foto terlama otomatis didepak).
 *   - Siap dimigrasikan ke Redis / Dedicated Backend (Adapter Pattern) di masa depan.
 * ============================================================================
 */

export interface StoredPhotoItem {
  id: string;
  dataUrl: string;
  createdAt: number;
  expiresAt: number;
}

// Batas waktu foto aktif di RAM (30 menit = 1.800.000 ms)
export const PHOTO_TTL_MS = 30 * 60 * 1000;

// Batas maksimal antrean foto di RAM untuk mencegah memory leak
export const MAX_PHOTO_CAPACITY = 50;

declare global {
  var _photosStoreMap: Map<string, StoredPhotoItem> | undefined;
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
 * Menyimpan foto ke RAM dengan TTL 30 menit dan auto-eviction
 */
export function savePhotoToMemory(id: string, dataUrl: string): StoredPhotoItem {
  const store = getPhotoStore();
  const now = Date.now();

  // 1. Bersihkan foto-foto yang sudah kedaluwarsa
  cleanupExpiredPhotos();

  // 2. Jika kapasitas melebihi batas (50 foto), hapus foto paling awal (FIFO)
  if (store.size >= MAX_PHOTO_CAPACITY) {
    const oldestKey = store.keys().next().value;
    if (oldestKey) {
      store.delete(oldestKey);
    }
  }

  const item: StoredPhotoItem = {
    id,
    dataUrl,
    createdAt: now,
    expiresAt: now + PHOTO_TTL_MS,
  };

  store.set(id, item);
  return item;
}

/**
 * Mengambil foto dari RAM berdasarkan ID
 * Mengembalikan null jika foto tidak ada atau sudah kedaluwarsa
 */
export function getPhotoFromMemory(id: string): StoredPhotoItem | null {
  const store = getPhotoStore();
  const item = store.get(id);

  if (!item) return null;

  // Cek apakah sudah kedaluwarsa
  if (Date.now() > item.expiresAt) {
    store.delete(id);
    return null;
  }

  return item;
}

/**
 * Menghapus semua foto yang masa berlakunya sudah lewat dari 30 menit
 */
export function cleanupExpiredPhotos(): void {
  const store = getPhotoStore();
  const now = Date.now();

  for (const [key, value] of store.entries()) {
    if (now > value.expiresAt) {
      store.delete(key);
    }
  }
}

