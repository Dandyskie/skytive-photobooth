"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { FRAMES, TIMERS } from "@/constants/frames";
import { Button } from "@/components/Button";
import { FrameMetadata, TimerOption } from "@/types";

export const FrameSelector: React.FC = () => {
  const {
    flowType,
    selectedFrame,
    setSelectedFrame,
    selectedTimer,
    setSelectedTimer,
    setStep,
  } = usePhotoboothStore();

  const [activeCategory, setActiveCategory] = useState<string>(
    flowType === "newspaper" ? "Newspaper" : "3-Strip Studio"
  );

  const categories = ["Semua", "3-Strip Studio", "Newspaper", "Classic Archive"];

  const filteredFrames = FRAMES.filter((frame) => {
    if (activeCategory === "Semua") return true;
    if (activeCategory === "3-Strip Studio")
      return frame.category === "3-Strip Studio" || frame.category === "Minimal Studio";
    if (activeCategory === "Newspaper") return frame.category === "Newspaper";
    if (activeCategory === "Classic Archive") return frame.category === "Classic Archive";
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto px-3.5 sm:px-6 py-4 sm:py-6 flex flex-col items-center">
      {/* Editorial Header Bar */}
      <div className="w-full max-w-4xl bg-[#FAF9F5] border border-[#191919]/15 p-4 sm:p-5 rounded-2xl mb-6 sm:mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="editorial-tag">LANGKAH 01 / 03</span>
            <span className="font-mono text-[11px] text-[#737373]">
              {selectedFrame.photoCount} FOTO • {selectedFrame.width}×{selectedFrame.height} PX
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-extrabold text-[#191919] tracking-tight">
            Pilih Desain Frame & Timer
          </h1>
          <p className="text-xs sm:text-sm text-[#595856] font-body mt-0.5">
            Tentukan format frame yang kamu inginkan dan atur jeda waktu untuk berganti pose.
          </p>
        </div>

        <button
          onClick={() => setStep("landing")}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#737373] hover:text-[#191919] transition-colors self-start sm:self-center cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>KEMBALI KE BERANDA</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#ECEAE4] rounded-xl border border-[#191919]/10 mb-6 w-full max-w-4xl overflow-x-auto scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs font-body font-semibold transition-all shrink-0 cursor-pointer ${
              activeCategory === cat
                ? "bg-[#191919] text-[#F5F3EE] shadow-xs"
                : "text-[#595856] hover:text-[#191919] hover:bg-black/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Frame Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 w-full max-w-4xl mb-8">
        {filteredFrames.map((frame: FrameMetadata) => {
          const isSelected = selectedFrame.id === frame.id;
          const isNewspaper = frame.flowType === "newspaper";

          return (
            <motion.div
              key={frame.id}
              whileHover={{ translateY: -3 }}
              onClick={() => setSelectedFrame(frame)}
              className={`relative rounded-2xl p-4 cursor-pointer transition-all border flex flex-col justify-between ${
                isSelected
                  ? "bg-[#FAF9F5] border-[#191919] shadow-md ring-1 ring-[#191919]"
                  : "bg-[#FAF9F5]/80 border-[#191919]/15 hover:border-[#191919]/50 hover:bg-[#FAF9F5]"
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 bg-[#191919] text-[#F5F3EE] p-1.5 rounded-full z-10 shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              )}

              {/* Frame Preview Container */}
              <div
                className={`relative w-full rounded-xl overflow-hidden bg-[#ECEAE4] mb-3.5 flex justify-center items-center border border-[#191919]/10 ${
                  isNewspaper
                    ? "aspect-[1414/2000] max-h-[300px]"
                    : "aspect-[1/3] max-h-[300px]"
                }`}
              >
                {frame.frameImage ? (
                  <Image
                    src={frame.frameImage}
                    alt={frame.name}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 33vw, 280px"
                    className="object-contain p-2"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#737373]">
                      POLOSAN
                    </span>
                    <span className="text-[11px] text-[#8E8D8A] mt-1">
                      Warna background kustom
                    </span>
                  </div>
                )}
              </div>

              {/* Title & Metadata */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#737373]">
                    {frame.flowType === "newspaper" ? "1 HERO SHOT" : "3 SHOTS STRIP"}
                  </span>
                  <span className="font-mono text-[9px] text-[#737373]">
                    {frame.width}×{frame.height}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-[#191919] tracking-tight">
                  {frame.name}
                </h3>
                <p className="text-xs text-[#595856] font-body mt-0.5 line-clamp-2">
                  {frame.description || `${frame.photoCount} Slot Foto • High-Res Export`}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Timer Selection Bar */}
      <div className="bg-[#FAF9F5] rounded-2xl p-4 sm:p-5 border border-[#191919]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 w-full max-w-4xl">
        <div className="flex items-center gap-2.5 text-[#191919]">
          <div className="w-8 h-8 rounded-lg bg-[#ECEAE4] flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#191919]" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base leading-tight">
              Timer Hitungan Mundur
            </h4>
            <p className="font-body text-xs text-[#595856]">
              Jeda detik antar pose untuk bersiap di depan kamera
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {TIMERS.map((timer: TimerOption) => (
            <button
              key={timer}
              onClick={() => setSelectedTimer(timer)}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-mono font-semibold text-xs transition-all border cursor-pointer text-center ${
                selectedTimer === timer
                  ? "bg-[#191919] text-[#F5F3EE] border-[#191919] shadow-xs"
                  : "bg-[#FAF9F5] text-[#595856] border-[#191919]/20 hover:border-[#191919] hover:text-[#191919]"
              }`}
            >
              {timer} DETIK
            </button>
          ))}
        </div>
      </div>

      {/* Continue CTA */}
      <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
        <Button
          size="lg"
          variant="primary"
          onClick={() => setStep("camera")}
          className="w-full sm:w-auto px-8 sm:px-12 py-3.5"
        >
          <span>LANJUT KE KAMERA</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

