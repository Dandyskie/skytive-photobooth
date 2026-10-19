import { NextRequest, NextResponse } from "next/server";
import { savePhotoToMemory } from "@/lib/photoStorage";

// Pastikan rute ini selalu dinamis tanpa caching statis
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * ============================================================================
 * POST /api/photos
 * ============================================================================
 * Fungsi: Menerima data soft file foto strip dari laptop photobooth.
 * Penyimpanan:
 *   - 100% di memori RAM (Ephemeral).
 *   - TIDAK MENULIS FILE KE HARDDISK LAPTOP (0 Bytes disk usage).
 *   - Foto otomatis memiliki batas waktu (TTL 30 menit).
 *   - Jika ada variabel Upstash Redis di environment, otomatis disinkronkan ke cloud RAM.
 * ============================================================================
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { dataUrl, id: customId } = body;

    // Validasi input data
    if (!dataUrl || typeof dataUrl !== "string") {
      return NextResponse.json(
        { error: "Format data foto tidak valid" },
        { status: 400 }
      );
    }

    // Gunakan ID dari klien (agar sinkron dengan LocalStorage laptop) atau buat ID unik baru
    const timestamp = Date.now().toString(36);
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const id = customId || `mk-${timestamp}-${randomSuffix}`;

    // 1. Simpan foto ke memori RAM server (Bukan ke harddisk laptop!)
    savePhotoToMemory(id, dataUrl);

    // 2. Opsi sinkronisasi cloud RAM (Jika Upstash Redis terpasang di environment Vercel)
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

    if (redisUrl && redisToken) {
      try {
        // Simpan ke Redis RAM dengan masa kedaluwarsa 1800 detik (30 menit)
        await fetch(`${redisUrl}/set/mk_photo_${id}?ex=1800`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${redisToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataUrl),
        });
      } catch (redisErr) {
        console.warn("Sinkronisasi cloud RAM opsional dilewati:", redisErr);
      }
    }

    return NextResponse.json({
      success: true,
      id,
      downloadUrl: `/p/${id}`,
      imageUrl: `/api/photos/${id}`,
      message: "Foto berhasil disimpan sementara di RAM (aktif 30 menit)",
    });
  } catch (error) {
    console.error("Gagal memproses simpan foto:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal server" },
      { status: 500 }
    );
  }
}
