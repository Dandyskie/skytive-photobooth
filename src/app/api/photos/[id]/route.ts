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

  let photoDataUrl: string | null = null;

  // 1. Ambil foto dari RAM server lokal
  const memoryItem = getPhotoFromMemory(id);
  if (memoryItem && memoryItem.dataUrl) {
    photoDataUrl = memoryItem.dataUrl;
  }

  // 2. Jika tidak ada di RAM lokal (misal di Vercel beda container), cek Upstash Redis
  if (!photoDataUrl) {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

    if (redisUrl && redisToken) {
      try {
        const redisRes = await fetch(`${redisUrl}/get/mk_photo_${id}`, {
          headers: { Authorization: `Bearer ${redisToken}` },
        });
        if (redisRes.ok) {
          const redisData = await redisRes.json();
          if (redisData.result && typeof redisData.result === "string") {
            photoDataUrl = redisData.result;
          }
        }
      } catch (redisErr) {
        console.warn("Gagal membaca dari Redis cloud:", redisErr);
      }
    }
  }

  // 3. Jika foto ditemukan di RAM atau Redis, kirimkan sebagai file gambar binary
  if (photoDataUrl) {
    const base64Data = photoDataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `inline; filename="SKYTIVE-PHOTOBOOTH-${id}.png"`,
        "Cache-Control": "public, max-age=1800, s-maxage=1800",
      },
    });
  }

  // 4. Jika tidak ditemukan atau sudah kedaluwarsa setelah 30 menit
  return NextResponse.json(
    {
      error: "Foto tidak ditemukan atau sesi sudah kadaluarsa (aktif 30 menit)",
      id,
    },
    { status: 404 }
  );
}
