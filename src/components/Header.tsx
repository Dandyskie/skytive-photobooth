"use client";

import React, { useState, useEffect } from "react";
import { Camera, RotateCcw, Maximize, Minimize } from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";

export const Header: React.FC = () => {
  const { step, flowType, resetPhotobooth } = usePhotoboothStore();
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen toggle failed:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#191919]/10 px-3.5 sm:px-6 md:px-8 py-3 transition-colors">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Logo & Editorial Wordmark */}
        <button
          onClick={resetPhotobooth}
          className="flex items-center gap-3 cursor-pointer group text-left transition-opacity hover:opacity-85 select-none min-w-0"
          title="SKYTIVE PHOTOBOOTH — Beranda"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#191919] text-[#F5F3EE] rounded-lg flex items-center justify-center shrink-0 border border-[#191919]">
            <Camera className="w-4 h-4 stroke-[2]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-[#191919]">
                SKYTIVE
              </span>
              <span className="font-heading font-medium text-xs sm:text-sm tracking-wider text-[#737373] uppercase">
                PHOTOBOOTH
              </span>
              <span className="hidden md:inline-block font-mono text-[9px] px-1.5 py-0.5 rounded border border-[#191919]/15 text-[#737373] tracking-widest uppercase">
                {flowType === "newspaper" ? "GAZETTE" : "3-STRIP"}
              </span>
            </div>
            <p className="font-mono text-[9px] sm:text-[10px] text-[#737373] tracking-wider uppercase truncate">
              Contemporary Studio • Vol. 02 Edition
            </p>
          </div>
        </button>

        {/* Status indicator, Fullscreen & Reset action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Studio Status Marker */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#ECEAE4] border border-[#191919]/10 text-[11px] font-mono text-[#595856]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-medium text-[#191919]">STUDIO ONLINE</span>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#191919] bg-[#FAF9F5] hover:bg-[#ECEAE4] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#191919]/20 transition-all cursor-pointer select-none min-h-[34px] sm:min-h-[36px]"
            title={isFullscreen ? "Keluar dari Layar Penuh" : "Mode Layar Penuh"}
          >
            {isFullscreen ? (
              <>
                <Minimize className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">EXIT</span>
              </>
            ) : (
              <>
                <Maximize className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">FULLSCREEN</span>
              </>
            )}
          </button>

          {/* Reset / Return Action */}
          {step !== "landing" && (
            <button
              onClick={resetPhotobooth}
              className="flex items-center gap-1.5 text-xs font-body font-semibold bg-[#191919] hover:bg-[#2E2E2E] text-[#F5F3EE] px-3 py-1.5 rounded-lg border border-[#191919] transition-all cursor-pointer min-h-[34px] sm:min-h-[36px]"
              title="Kembali ke Beranda"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Reset</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

