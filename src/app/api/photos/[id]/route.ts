import { NextRequest, NextResponse } from "next/server";
import { getPhotoFromMemory } from "@/lib/photoStorage";

// Pastikan rute ini selalu dinamis
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * ============================================================================
 * GET /api/photos/[id]
 * ============================================================================
 * Fungsi: Mengalirkan (stream) binary gambar foto strip ke HP pelanggan.
 * Sumber:
 *   - 100% dari memori RAM server / cache (bukan dari harddisk laptop).
 *   - Mengembalikan HTTP status 200 dengan Content-Type: image/png.
 *   - Jika masa 30 menit sudah lewat, mengembalikan 404 dengan pesan informatif.
 * ============================================================================
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { error: "ID foto tidak disertakan" },
      { status: 400 }
    );
  }

  const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "");

  let photoBuffer: Buffer | null = null;
  let photoMimeType: string = "image/png";

  // 1. Ambil foto dari RAM server lokal / Disk Cache
  const memoryItem = getPhotoFromMemory(safeId);
  if (memoryItem) {
    if (memoryItem.buffer) {
      photoBuffer = memoryItem.buffer;
    } else if (memoryItem.dataUrl) {
      const commaIdx = memoryItem.dataUrl.indexOf(",");
      const base64Data = commaIdx !== -1 ? memoryItem.dataUrl.slice(commaIdx + 1) : memoryItem.dataUrl;
      photoBuffer = Buffer.from(base64Data, "base64");
    }
    if (memoryItem.mimeType) {
      photoMimeType = memoryItem.mimeType;
    }
  }

  // 2. Jika tidak ada di RAM lokal (misal di Vercel beda container), cek Upstash Redis
  if (!photoBuffer) {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

    if (redisUrl && redisToken) {
      try {
        const redisRes = await fetch(`${redisUrl}/get/mk_photo_${safeId}`, {
          headers: { Authorization: `Bearer ${redisToken}` },
        });
        if (redisRes.ok) {
          const redisData = await redisRes.json();
          if (redisData.result && typeof redisData.result === "string") {
            const raw = redisData.result;
            const mimeMatch = raw.match(/^data:([^;]+);base64,/);
            if (mimeMatch) photoMimeType = mimeMatch[1];
            const commaIdx = raw.indexOf(",");
            const base64Data = commaIdx !== -1 ? raw.slice(commaIdx + 1) : raw;
            photoBuffer = Buffer.from(base64Data, "base64");
          }
        }
      } catch (redisErr) {
        console.warn("Gagal membaca dari Redis cloud:", redisErr);
      }
    }
  }

  // 3. Jika foto ditemukan di RAM, Disk Cache, atau Redis, alirkan sebagai file gambar binary
  if (photoBuffer) {
    return new Response(new Uint8Array(photoBuffer), {
      status: 200,
      headers: {
        "Content-Type": photoMimeType,
        "Content-Length": photoBuffer.length.toString(),
        "Content-Disposition": `inline; filename="SKYTIVE-PHOTOBOOTH-${safeId}.png"`,
        "Cache-Control": "public, max-age=1800, s-maxage=1800",
      },
    });
  }

  // 4. Jika tidak ditemukan atau sudah kedaluwarsa setelah 30 menit
  return NextResponse.json(
    {
      error: "Foto tidak ditemukan atau sesi sudah kadaluarsa (aktif 30 menit)",
      id: safeId,
    },
    { status: 404 }
  );
}
