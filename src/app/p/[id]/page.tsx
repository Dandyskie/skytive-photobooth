"use client";

/**
 * ============================================================================
 * HALAMAN UNDUH PELANGGAN (CUSTOMER DOWNLOAD VIEW)
 * ============================================================================
 * Rute: /p/[id]
 * Alur:
 *   1. Pelanggan scan QR code di booth -> Halaman ini terbuka di HP pelanggan.
 *   2. Foto dimuat langsung dari RAM server (/api/photos/[id]).
 *   3. Jika dibuka di laptop/browser yang sama, foto diambil instan dari LocalStorage.
 *   4. Tombol "Unduh ke Galeri HP" mendownload file PNG beresolusi tinggi.
 *   5. Mendukung format 3-Strip dan Newspaper Edition.
 * ============================================================================
 */

import React, { use, useState } from "react";
import Link from "next/link";
import { Download, Share2, Camera, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/Button";

interface CustomerDownloadPageProps {
  params: Promise<{ id: string }>;
}

const getInitialPhotoSrc = (photoId: string): string => {
  if (typeof window !== "undefined") {
    try {
      const localData =
        localStorage.getItem(`sky_photo_${photoId}`) ||
        localStorage.getItem("sky_latest_strip") ||
        localStorage.getItem(`mk_photo_${photoId}`) ||
        localStorage.getItem("mk_latest_strip");
      if (localData && localData.startsWith("data:image")) {
        return localData;
      }
    } catch {
      // LocalStorage error ignore
    }
  }
  return `/api/photos/${photoId}`;
};

export default function CustomerDownloadPage({ params }: CustomerDownloadPageProps) {
  const { id } = use(params);
  const [photoSrc, setPhotoSrc] = useState<string>(() => getInitialPhotoSrc(id));
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (photoSrc.startsWith("data:image")) {
        const link = document.createElement("a");
        link.href = photoSrc;
        link.download = `SKYTIVE-PHOTOBOOTH-${id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      const response = await fetch(photoSrc);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `SKYTIVE-PHOTOBOOTH-${id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(photoSrc, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SKYTIVE PHOTOBOOTH",
          text: "Cek hasil foto digital SKYTIVE PHOTOBOOTH milikku! ✨",
          url: window.location.href,
        });
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto py-4 sm:py-6 px-4 flex flex-col items-center min-h-[85vh] justify-between">
      {/* Editorial Brand Header */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center gap-2 bg-[#FAF9F5] border border-[#191919]/15 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium text-[#595856] mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span>SKYTIVE PHOTOBOOTH STUDIO</span>
        </div>
        <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#191919] tracking-tight leading-tight">
          HASIL FOTO DIGITAL
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#595856] mt-0.5">
          Contemporary Editorial Studio • Simpan kenangan langsung ke galeri smartphone.
        </p>
      </div>

      {/* Photo Preview Container */}
      <div className="editorial-card w-full max-w-[280px] sm:max-w-[300px] p-3 rounded-2xl mb-5 flex flex-col items-center">
        <div className="relative w-full max-h-[60vh] rounded-xl overflow-hidden bg-[#ECEAE4] border border-[#191919]/10 flex items-center justify-center p-1">
          {!isFailed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoSrc}
              alt="Hasil Foto Skytive Photobooth"
              className="max-h-[55vh] w-auto max-w-full object-contain rounded-lg"
              onError={() => {
                // Fallback to localStorage if API call failed
                try {
                  const fallback =
                    localStorage.getItem(`sky_photo_${id}`) ||
                    localStorage.getItem("sky_latest_strip") ||
                    localStorage.getItem(`mk_photo_${id}`) ||
                    localStorage.getItem("mk_latest_strip");
                  if (fallback && fallback !== photoSrc) {
                    setPhotoSrc(fallback);
                    return;
                  }
                } catch {
                  // Fallback failed
                }
                setIsFailed(true);
              }}
            />
          ) : (
            <div className="w-full h-48 flex flex-col items-center justify-center p-4 text-center text-[#B83A24] font-body text-xs gap-2">
              <span className="font-heading font-bold text-sm">Foto Belum Ditemukan</span>
              <p className="text-xs text-[#595856] max-w-[200px]">
                Sedang memproses sinkronisasi atau sesi telah berakhir.
              </p>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setIsFailed(false);
                  setPhotoSrc(`/api/photos/${id}?t=${Date.now()}`);
                }}
                className="mt-2 text-xs py-1.5 px-3"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                <span>Coba Sinkronkan</span>
              </Button>
            </div>
          )}
        </div>
        <p className="text-[10px] font-mono text-[#737373] mt-2.5 text-center">
          ID: {id} • FORMAT HIGH-RES PNG
        </p>
      </div>

      {/* Download & Share Actions */}
      <div className="w-full max-w-xs flex flex-col gap-2.5 mb-6">
        <Button
          size="lg"
          variant="primary"
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full py-3 text-sm font-heading font-bold tracking-normal"
        >
          <Download className="w-4 h-4 mr-2" />
          <span>{isDownloading ? "MENGUNDUH..." : "UNDUH KE GALERI (PNG)"}</span>
        </Button>

        <Button
          size="md"
          variant="secondary"
          onClick={handleShare}
          className="w-full py-2.5 text-xs font-semibold"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 mr-1.5 text-[#10B981]" />
              <span>LINK BERHASIL DISALIN</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              <span>BAGIKAN / SALIN LINK</span>
            </>
          )}
        </Button>

        <Link href="/" className="w-full">
          <Button
            size="md"
            variant="ghost"
            className="w-full py-2 text-xs text-[#595856] hover:text-[#191919]"
          >
            <Camera className="w-3.5 h-3.5 mr-1.5" />
            <span>Mulai Photobooth Baru</span>
          </Button>
        </Link>
      </div>

      {/* Editorial Footer Note */}
      <div className="text-center text-[10px] font-mono text-[#8E8D8A] uppercase tracking-wider">
        <p>© {new Date().getFullYear()} SKYTIVE PHOTOBOOTH STUDIO</p>
      </div>
    </div>
  );
}

