"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Move,
  ZoomIn,
  QrCode,
  RotateCcw,
  ArrowRight,
  Camera,
  LayoutTemplate,
  Palette,
  Check,
} from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { Button } from "@/components/Button";
import { FRAMES } from "@/constants/frames";
import { generateHighResPNG } from "@/lib/canvasExporter";

const EDITORIAL_PALETTES = [
  { name: "Off-White Studio", value: "#FFFFFF" },
  { name: "Warm Editorial", value: "#F5F3EE" },
  { name: "Newsprint Vintage", value: "#EFECE6" },
  { name: "Deep Ink Black", value: "#191919" },
  { name: "Soft Blush", value: "#FFF0F5" },
  { name: "Pastel Lavender", value: "#F3E8FF" },
  { name: "Terracotta Accent", value: "#B83A24" },
];

export const PhotoEditor: React.FC = () => {
  const {
    selectedFrame,
    setSelectedFrame,
    photos,
    photoPositions,
    updatePhotoPosition,
    setStep,
    setFinalStrip,
  } = usePhotoboothStore();

  const isNewspaper =
    selectedFrame.flowType === "newspaper" || selectedFrame.photoCount === 1;

  const [activeSlotIndex, setActiveSlotIndex] = useState<number>(0);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const activePos = photoPositions[activeSlotIndex] || { x: 0, y: 0, scale: 1 };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(e.target.value);
    updatePhotoPosition(activeSlotIndex, { scale });
  };

  const handleDrag = (dx: number, dy: number) => {
    updatePhotoPosition(activeSlotIndex, {
      x: activePos.x + dx,
      y: activePos.y + dy,
    });
  };

  const handleColorChange = (color: string) => {
    setSelectedFrame({
      ...selectedFrame,
      backgroundColor: color,
    });
  };

  const availableFrames = FRAMES.filter((f) =>
    isNewspaper ? f.flowType === "newspaper" : f.flowType === "3-strip"
  );

  /**
   * Ekspor kanvas resolusi tinggi, simpan ke memori dan alihkan ke halaman download QR
   */
  const executeProceedToQrCode = async () => {
    setIsExporting(true);

    try {
      // 1. Gambar canvas resolusi tinggi (600x1800 atau 1414x2000 px)
      const dataUrl = await generateHighResPNG(selectedFrame, photos, photoPositions);

      // 2. ID unik untuk sesi foto Skytive
      let photoId = `sky-${Date.now().toString(36)}`;

      // 3. Simpan di LocalStorage browser laptop (instan 0ms)
      try {
        localStorage.setItem(`sky_photo_${photoId}`, dataUrl);
        localStorage.setItem("sky_latest_strip", dataUrl);
        localStorage.setItem("sky_latest_id", photoId);
        // Backward compatibility
        localStorage.setItem(`mk_photo_${photoId}`, dataUrl);
        localStorage.setItem("mk_latest_strip", dataUrl);
        localStorage.setItem("mk_latest_id", photoId);
      } catch (lsErr) {
        console.warn("Penyimpanan LocalStorage lokal:", lsErr);
      }

      // 4. Kirim ke API endpoint photos (dengan retry jika kendala sementara)
      try {
        let res = await fetch("/api/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: photoId, dataUrl, frameId: selectedFrame.id }),
        });

        if (!res.ok) {
          // Retry sekali
          res = await fetch("/api/photos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: photoId, dataUrl, frameId: selectedFrame.id }),
          });
        }

        if (res.ok) {
          const data = await res.json();
          if (data.id) {
            photoId = data.id;
            try {
              localStorage.setItem(`sky_photo_${photoId}`, dataUrl);
              localStorage.setItem("sky_latest_id", photoId);
            } catch {}
          }
        } else {
          console.error("Gagal menyimpan foto strip di server:", res.status, res.statusText);
        }
      } catch (uploadErr) {
        console.warn("Gagal mengirim ke server, menggunakan ID lokal:", uploadErr);
      }

      // 5. Simpan ke Zustand dan lanjut ke tampilan QR Code
      setFinalStrip(dataUrl, photoId);
      setStep("download");
    } catch (err) {
      console.error("Kendala saat proses ekspor:", err);
      alert("Terjadi kendala saat memproses gambar. Silakan coba lagi.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col items-center">
      {/* Editorial Header Bar */}
      <div className="w-full max-w-4xl bg-[#FAF9F5] border border-[#191919]/15 p-3.5 sm:p-4 rounded-2xl mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="editorial-tag">LANGKAH 03 / 03</span>
          <span className="font-heading font-bold text-sm text-[#191919] truncate">
            {isNewspaper ? "PREVIEW & ADJUST NEWSPAPER" : "EDITOR FOTO & FRAME STRIP"}
          </span>
          <span className="hidden sm:inline-block text-[#737373]">•</span>
          <span className="hidden sm:inline-block font-mono text-[11px] text-[#737373]">
            {selectedFrame.width}×{selectedFrame.height} PX
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep("camera")}
            className="text-xs font-mono font-medium text-[#191919] bg-[#FAF9F5] hover:bg-[#ECEAE4] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#191919]/20 transition-all cursor-pointer flex items-center gap-1.5 min-h-[32px]"
            title="Ambil Ulang Foto"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">FOTO ULANG</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-6 sm:gap-8 w-full max-w-4xl">
        {/* ================================================================= */}
        {/* LIVE PREVIEW CANVAS */}
        {/* ================================================================= */}
        <div
          className={`relative rounded-2xl overflow-hidden shadow-lg border border-[#191919]/25 shrink-0 transition-colors duration-200 md:sticky md:top-20 z-20 ${
            isNewspaper
              ? "w-[240px] h-[340px] sm:w-[280px] sm:h-[396px] md:w-[320px] md:h-[452px] aspect-[1414/2000]"
              : "w-[130px] h-[390px] sm:w-[160px] sm:h-[480px] md:w-[190px] md:h-[570px] lg:w-[210px] lg:h-[630px] aspect-[1/3]"
          }`}
          style={{ backgroundColor: selectedFrame.backgroundColor || "#FFFFFF" }}
        >
          {/* Photos Container */}
          <div className="absolute inset-0 z-0">
            {selectedFrame.slots.map((slot, idx) => {
              const photoUrl = photos[idx];
              const pos = photoPositions[idx] || { x: 0, y: 0, scale: 1 };
              const isActive = activeSlotIndex === idx;

              const slotStyle: React.CSSProperties = {
                left: `${(slot.x / selectedFrame.width) * 100}%`,
                top: `${(slot.y / selectedFrame.height) * 100}%`,
                width: `${(slot.width / selectedFrame.width) * 100}%`,
                height: `${(slot.height / selectedFrame.height) * 100}%`,
                borderRadius: `${(slot.borderRadius || 0) / 3}px`,
              };

              return (
                <div
                  key={slot.id}
                  onClick={() => setActiveSlotIndex(idx)}
                  style={slotStyle}
                  className={`absolute overflow-hidden cursor-pointer transition-all ${
                    isActive
                      ? "ring-2 ring-[#B83A24] z-10 shadow-md"
                      : "border-transparent"
                  }`}
                >
                  {photoUrl ? (
                    <div
                      style={{
                        transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
                        transformOrigin: "center center",
                        transition: "transform 0.05s ease-out",
                      }}
                      className="w-full h-full relative"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoUrl}
                        alt={`Photo Slot ${idx + 1}`}
                        className="w-full h-full object-cover pointer-events-none select-none"
                        draggable={false}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-[#E5E3DC] flex items-center justify-center text-[10px] font-mono text-[#737373]">
                      Slot {idx + 1}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Frame PNG Overlay */}
          {selectedFrame.frameImage &&
            selectedFrame.frameImage.trim() !== "" &&
            selectedFrame.frameImage !== "none" && (
              <div className="absolute inset-0 z-20 pointer-events-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedFrame.frameImage}
                  alt="Frame Overlay"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable={false}
                />
              </div>
            )}
        </div>

        {/* ================================================================= */}
        {/* CONTROLS PANEL */}
        {/* ================================================================= */}
        <div className="flex-1 w-full min-w-0 flex flex-col gap-4 sm:gap-5 bg-[#FAF9F5] rounded-2xl p-4 sm:p-6 border border-[#191919]/15">
          {/* 1. Frame Selection (Only shown for 3-strip flow to switch designs) */}
          {!isNewspaper && availableFrames.length > 1 && (
            <div>
              <label className="text-xs font-mono font-medium text-[#737373] uppercase flex items-center gap-1.5 mb-2">
                <LayoutTemplate className="w-3.5 h-3.5 text-[#191919]" />
                <span>PILIH DESAIN FRAME 3-STRIP:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {availableFrames.map((frame) => {
                  const isSelected = selectedFrame.id === frame.id;
                  return (
                    <button
                      key={frame.id}
                      type="button"
                      onClick={() => setSelectedFrame(frame)}
                      className={`relative p-2 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center ${
                        isSelected
                          ? "bg-[#ECEAE4] border-[#191919] ring-1 ring-[#191919]"
                          : "bg-[#FAF9F5] border-[#191919]/15 hover:border-[#191919]/40"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-[#191919] text-[#F5F3EE] p-0.5 rounded-full">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                      <div className="relative w-full h-14 rounded-lg overflow-hidden bg-[#ECEAE4] mb-1.5 flex items-center justify-center">
                        {frame.thumbnail ? (
                          <Image
                            src={frame.thumbnail}
                            alt={frame.name}
                            fill
                            sizes="120px"
                            className="object-contain p-1"
                          />
                        ) : (
                          <span className="text-[10px] font-mono text-[#737373]">
                            POLOS
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-heading font-semibold text-[#191919] leading-tight line-clamp-1">
                        {frame.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 1b. Palet Background jika Frame Polosan dipilih */}
          {selectedFrame.id === "frame-noframe" && (
            <div className="p-3 rounded-xl bg-[#ECEAE4] border border-[#191919]/10">
              <label className="text-[11px] font-mono font-medium text-[#737373] uppercase flex items-center gap-1.5 mb-2">
                <Palette className="w-3.5 h-3.5 text-[#191919]" />
                <span>WARNA BACKGROUND POLOSAN:</span>
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {EDITORIAL_PALETTES.map((c) => {
                  const isColorActive =
                    (selectedFrame.backgroundColor || "#FFFFFF").toLowerCase() ===
                    c.value.toLowerCase();
                  return (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => handleColorChange(c.value)}
                      className={`w-7 h-7 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                        isColorActive
                          ? "border-[#191919] ring-2 ring-[#191919]/40 scale-110 shadow-xs"
                          : "border-[#191919]/20 hover:scale-105"
                      }`}
                      style={{ backgroundColor: c.value }}
                      title={c.name}
                    >
                      {isColorActive && (
                        <Check
                          className={`w-3.5 h-3.5 stroke-[3] ${
                            c.value === "#191919" || c.value === "#B83A24"
                              ? "text-white"
                              : "text-[#191919]"
                          }`}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Slot Selector Tabs (Hanya untuk 3-strip yang punya multiple slot) */}
          {!isNewspaper && selectedFrame.slots.length > 1 && (
            <div>
              <label className="text-xs font-mono font-medium text-[#737373] uppercase block mb-1.5">
                PILIH SLOT FOTO UNTUK DISESUAIKAN:
              </label>
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${selectedFrame.slots.length}, minmax(0, 1fr))`,
                }}
              >
                {selectedFrame.slots.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlotIndex(idx)}
                    className={`py-2 rounded-xl font-mono font-semibold text-xs transition-all border cursor-pointer flex items-center justify-center ${
                      activeSlotIndex === idx
                        ? "bg-[#191919] text-[#F5F3EE] border-[#191919] shadow-xs"
                        : "bg-[#FAF9F5] text-[#595856] border-[#191919]/20 hover:border-[#191919]"
                    }`}
                  >
                    SLOT {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. Zoom Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono font-medium text-[#737373] uppercase flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-[#191919]" />
                <span>
                  {isNewspaper
                    ? "ZOOM FOTO HEADLINE"
                    : `ZOOM UKURAN FOTO (SLOT ${activeSlotIndex + 1})`}
                </span>
              </label>
              <span className="text-xs font-mono font-semibold text-[#191919]">
                {Math.round(activePos.scale * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.05"
              value={activePos.scale}
              onChange={handleZoomChange}
              className="w-full accent-[#191919] h-2 bg-[#ECEAE4] border border-[#191919]/20 rounded-lg cursor-pointer"
            />
          </div>

          {/* 4. Drag Position Controls */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-mono font-medium text-[#737373] uppercase flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5 text-[#191919]" />
                <span>
                  {isNewspaper
                    ? "GESER POSISI FOTO HEADLINE"
                    : `GESER POSISI FOTO (SLOT ${activeSlotIndex + 1})`}
                </span>
              </label>
              <button
                onClick={() =>
                  updatePhotoPosition(activeSlotIndex, { x: 0, y: 0, scale: 1 })
                }
                className="text-[11px] font-mono text-[#737373] hover:text-[#191919] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-[170px] mx-auto">
              <div />
              <button
                onClick={() => handleDrag(0, -10)}
                className="min-h-[38px] py-1.5 bg-[#FAF9F5] border border-[#191919]/25 hover:border-[#191919] hover:bg-[#ECEAE4] font-bold rounded-lg text-xs transition-all text-[#191919] cursor-pointer flex items-center justify-center active:scale-95"
                title="Geser Atas"
              >
                ▲
              </button>
              <div />
              <button
                onClick={() => handleDrag(-10, 0)}
                className="min-h-[38px] py-1.5 bg-[#FAF9F5] border border-[#191919]/25 hover:border-[#191919] hover:bg-[#ECEAE4] font-bold rounded-lg text-xs transition-all text-[#191919] cursor-pointer flex items-center justify-center active:scale-95"
                title="Geser Kiri"
              >
                ◀
              </button>
              <div className="min-h-[38px] flex items-center justify-center font-mono text-[10px] text-[#737373]">
                POS
              </div>
              <button
                onClick={() => handleDrag(10, 0)}
                className="min-h-[38px] py-1.5 bg-[#FAF9F5] border border-[#191919]/25 hover:border-[#191919] hover:bg-[#ECEAE4] font-bold rounded-lg text-xs transition-all text-[#191919] cursor-pointer flex items-center justify-center active:scale-95"
                title="Geser Kanan"
              >
                ▶
              </button>
              <div />
              <button
                onClick={() => handleDrag(0, 10)}
                className="min-h-[38px] py-1.5 bg-[#FAF9F5] border border-[#191919]/25 hover:border-[#191919] hover:bg-[#ECEAE4] font-bold rounded-lg text-xs transition-all text-[#191919] cursor-pointer flex items-center justify-center active:scale-95"
                title="Geser Bawah"
              >
                ▼
              </button>
              <div />
            </div>
          </div>

          {/* Action CTA: Selesai langsung ke QR Code & Download */}
          <div className="pt-3 border-t border-[#191919]/10">
            <Button
              size="lg"
              variant={isNewspaper ? "accent" : "primary"}
              disabled={isExporting}
              onClick={executeProceedToQrCode}
              className="w-full py-3.5 text-sm sm:text-base font-heading font-bold tracking-normal"
            >
              {isExporting ? (
                <span>MEMPROSES HASIL AKHIR...</span>
              ) : (
                <>
                  <QrCode className="w-4 h-4 mr-2" />
                  <span>
                    {isNewspaper
                      ? "SELESAI & UNDUH NEWSPAPER"
                      : "SELESAI & KE HALAMAN QR CODE"}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

