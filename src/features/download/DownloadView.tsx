"use client";

import React, { useEffect, useState } from "react";
import {
  QrCode,
  RotateCcw,
  Camera,
  Download,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { Button } from "@/components/Button";
import QRCode from "qrcode";
import { downloadDataUrl } from "@/lib/canvasExporter";

export const DownloadView: React.FC = () => {
  const {
    selectedFrame,
    resetPhotobooth,
    setStep,
    finalStripUrl,
    photoShareId,
  } = usePhotoboothStore();

  const isNewspaper =
    selectedFrame.flowType === "newspaper" || selectedFrame.photoCount === 1;

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [networkOrigin, setNetworkOrigin] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hostname = window.location.hostname;
    // Jika dibuka di browser laptop/booth via localhost/127.0.0.1,
    // ambil IP LAN lokal (misal http://192.168.1.80:3000) agar kamera HP bisa langsung membukanya di jaringan Wi-Fi lokal
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      fetch("/api/network-ip")
        .then((res) => res.json())
        .then((data) => {
          if (data.lanIp) {
            const port = window.location.port ? `:${window.location.port}` : "";
            setNetworkOrigin(`http://${data.lanIp}${port}`);
          }
        })
        .catch(() => {});
    }
  }, []);

  const effectiveOrigin =
    networkOrigin ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const shareUrl = effectiveOrigin
    ? `${effectiveOrigin}/p/${photoShareId || "sample"}`
    : `/p/${photoShareId || "sample"}`;

  useEffect(() => {
    if (!shareUrl) return;

    QRCode.toDataURL(shareUrl, {
      width: 320,
      margin: 2,
      color: {
        dark: "#191919",
        light: "#FAF9F5",
      },
    })
      .then((url) => setQrCodeDataUrl(url))
      .catch((err) => console.error("QR generation failed:", err));
  }, [shareUrl]);

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadAgain = () => {
    if (finalStripUrl) {
      downloadDataUrl(
        finalStripUrl,
        `SKYTIVE-PHOTOBOOTH-${selectedFrame.id}-${photoShareId || Date.now()}.png`
      );
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col items-center text-center">
      {/* Editorial Header Bar */}
      <div className="w-full max-w-2xl bg-[#FAF9F5] border border-[#191919]/15 p-4 sm:p-5 rounded-2xl mb-6">
        <span className="editorial-tag inline-block">
          LANGKAH 03 / 03 • SESI SELESAI
        </span>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-[#191919] mt-2 tracking-tight">
          {isNewspaper
            ? "POSTER NEWSPAPER SIAP DIUNDUH"
            : "STRIP FOTO SIAP DIUNDUH"}
        </h1>
        <p className="text-xs sm:text-sm text-[#595856] font-body mt-1">
          Scan QR Code untuk menyimpan foto langsung ke galeri smartphone, atau unduh langsung ke komputer ini.
        </p>
      </div>

      {/* Main Grid: QR Code & Strip Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-3xl lg:max-w-4xl items-stretch mb-6 text-left">
        {/* Card 1: QR Code Scanner (Download di HP Pelanggan) */}
        <div className="editorial-card rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center justify-between">
          <div className="flex flex-col items-center w-full">
            <div className="inline-flex items-center gap-1.5 bg-[#ECEAE4] text-[#191919] font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded-md border border-[#191919]/10 mb-3">
              <QrCode className="w-3.5 h-3.5" />
              <span>SCAN QR KE SMARTPHONE</span>
            </div>

            <h3 className="font-heading font-bold text-base sm:text-lg text-[#191919] mb-1 tracking-tight">
              Unduh di Smartphone
            </h3>
            <p className="text-xs text-[#595856] font-body mb-4 max-w-xs leading-relaxed">
              Buka kamera smartphone dan arahkan ke QR Code berikut untuk mengakses halaman download galeri:
            </p>

            {/* QR Code Canvas Frame */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 bg-[#FAF9F5] p-3 rounded-2xl border border-[#191919]/20 shadow-xs flex items-center justify-center mb-3">
              {qrCodeDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={qrCodeDataUrl}
                  alt="QR Code Download"
                  className="object-contain w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-xs font-mono text-[#737373] animate-pulse">
                  Membuat QR Code...
                </span>
              )}
            </div>

            {/* Status note */}
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#595856] bg-[#ECEAE4] px-2.5 py-1 rounded-md mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              <span>Aktif & Siap Disimpan ke Galeri HP</span>
            </div>
          </div>

          {/* Link Actions */}
          <div className="w-full flex flex-col gap-2">
            <button
              onClick={handleCopyLink}
              className="w-full py-2.5 px-3 bg-[#FAF9F5] hover:bg-[#ECEAE4] border border-[#191919]/20 rounded-xl text-xs font-mono font-semibold text-[#191919] flex items-center justify-center gap-2 transition-all cursor-pointer min-h-[40px]"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span>LINK BERHASIL DISALIN</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#737373]" />
                  <span>Salin Tautan Unduh Web</span>
                </>
              )}
            </button>

            {shareUrl && (
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1 text-center text-xs font-mono text-[#737373] hover:text-[#191919] hover:underline flex items-center justify-center gap-1.5"
              >
                <span>Buka di Tab Baru</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Card 2: Strip Preview & Local Device Download (Unduh di Booth Ini) */}
        <div className="editorial-card rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center justify-between">
          <div className="flex flex-col items-center w-full">
            <div className="inline-flex items-center gap-1.5 bg-[#ECEAE4] text-[#191919] font-mono text-[10px] sm:text-xs px-2.5 py-1 rounded-md border border-[#191919]/10 mb-3">
              <Download className="w-3.5 h-3.5" />
              <span>PREVIEW & SIMPAN DI BOOTH</span>
            </div>

            {/* Preview Frame */}
            <div
              className={`relative mx-auto bg-[#ECEAE4] rounded-xl overflow-hidden border border-[#191919]/15 shadow-sm mb-4 flex items-center justify-center p-1 ${
                isNewspaper
                  ? "w-[170px] xs:w-[190px] sm:w-[210px] md:w-[230px] aspect-[1414/2000]"
                  : "w-[105px] xs:w-[115px] sm:w-[125px] md:w-[135px] aspect-[1/3]"
              }`}
            >
              {finalStripUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={finalStripUrl}
                  alt="Hasil Final Photobooth"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[#737373] p-2 text-center">
                  Preview Belum Tersedia
                </div>
              )}
            </div>

            <p className="text-xs text-[#595856] font-body mb-3 max-w-xs leading-relaxed">
              Simpan file format PNG resolusi tinggi ({selectedFrame.width}×{selectedFrame.height} px) langsung ke memori perangkat ini:
            </p>
          </div>

          <Button
            size="md"
            variant="secondary"
            onClick={handleDownloadAgain}
            className="w-full py-2.5 text-xs sm:text-sm font-semibold tracking-normal min-h-[42px]"
          >
            <Download className="w-4 h-4 mr-2" />
            <span>UNDUH DI PERANGKAT INI (PNG)</span>
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
        <Button
          size="lg"
          variant="primary"
          onClick={() => {
            resetPhotobooth();
            setStep("camera");
          }}
          className="w-full sm:flex-1 py-3 text-sm font-heading tracking-normal"
        >
          <Camera className="w-4 h-4 mr-2" />
          <span>FOTO ULANG</span>
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => setStep("editor")}
          className="w-full sm:flex-1 py-3 text-sm font-heading tracking-normal"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          <span>KEMBALI KE EDITOR</span>
        </Button>
      </div>
    </div>
  );
};

