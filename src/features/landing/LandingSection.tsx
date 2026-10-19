"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Newspaper, ArrowRight, Layers, Download } from "lucide-react";
import { Button } from "@/components/Button";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { DEFAULT_3STRIP_FRAME, NEWSPAPER_FRAME } from "@/constants/frames";

export const LandingSection: React.FC = () => {
  const { startFlow } = usePhotoboothStore();

  const studioHighlights = [
    {
      icon: <Camera className="w-5 h-5 text-[#191919]" />,
      tag: "REAL-TIME CAMERA",
      title: "Live HD Shutter",
      description:
        "Preview kamera beresolusi tinggi dengan hitungan mundur presisi dan prep-light shutter visual.",
    },
    {
      icon: <Layers className="w-5 h-5 text-[#191919]" />,
      tag: "DUAL FORMATS",
      title: "Strip & Newspaper",
      description:
        "Dua alur studio: format 3-Strip vertikal klasik (600×1800) dan format Newspaper Gazette (1414×2000).",
    },
    {
      icon: <Download className="w-5 h-5 text-[#191919]" />,
      tag: "INSTANT QR & EXPORT",
      title: "Zero-Delay Download",
      description:
        "QR Code instan langsung ke perangkat smartphone tanpa jeda, kompresi jernih, dan 100% tanpa registrasi.",
    },
  ];

  return (
    <div className="w-full flex flex-col justify-between overflow-hidden">
      {/* Editorial Studio Ticker */}
      <div className="bg-[#FAF9F5] border-y border-[#191919]/10 py-2 sm:py-2.5 overflow-hidden text-[#191919] font-mono text-[11px] sm:text-xs tracking-widest uppercase">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4 font-semibold">SKYTIVE PHOTOBOOTH STUDIO</span>
          <span className="mx-2 text-[#737373]">•</span>
          <span className="mx-4 text-[#737373]">VOL. 02 CONTEMPORARY EDITORIAL</span>
          <span className="mx-2 text-[#737373]">•</span>
          <span className="mx-4">3-STRIP SEQUENCE (600×1800 PX)</span>
          <span className="mx-2 text-[#737373]">•</span>
          <span className="mx-4 text-[#737373]">NEWSPAPER GAZETTE EDITION (1414×2000 PX)</span>
          <span className="mx-2 text-[#737373]">•</span>
          <span className="mx-4">HIGH-RES DIGITAL CANVAS</span>
          <span className="mx-2 text-[#737373]">•</span>
          <span className="mx-4 font-semibold">SKYTIVE PHOTOBOOTH STUDIO</span>
          <span className="mx-2 text-[#737373]">•</span>
          <span className="mx-4 text-[#737373]">VOL. 02 CONTEMPORARY EDITORIAL</span>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 md:py-14 text-center flex-1 flex flex-col items-center justify-center">
        {/* Editorial Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 bg-[#FAF9F5] border border-[#191919]/15 px-3 py-1 rounded-full text-[10px] sm:text-xs font-mono font-medium text-[#595856] mb-4 sm:mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#B83A24]" />
          <span>EDITION 2026 // CONTEMPORARY PHOTO STUDIO</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-[#191919] max-w-4xl leading-[1.1] sm:leading-[1.08] mb-4 sm:mb-6"
        >
          MEMORIES PRESERVED IN{" "}
          <span className="text-[#B83A24] font-bold">EDITORIAL</span> PRINTS.
        </motion.h1>

        {/* Supporting Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.35 }}
          className="text-sm sm:text-base md:text-lg text-[#595856] max-w-2xl font-body mb-8 sm:mb-12 leading-relaxed"
        >
          Pengalaman photobooth digital dengan estetika editorial minimalis.
          Pilih antara format 3-Strip vertikal klasik atau 1-Shot Newspaper Gazette edisi cetak surat kabar.
        </motion.p>

        {/* Dual Flow Cards (The 2 Core System Flows) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-4xl text-left mb-12 sm:mb-16"
        >
          {/* Flow Card 1: 3-Strip Edition */}
          <div className="editorial-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between group hover:border-[#191919]/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="editorial-tag">ALUR 1 • 3 FOTO</span>
                <span className="font-mono text-[11px] text-[#737373]">FORMAT 600×1800 PX</span>
              </div>

              {/* Visual Thumbnail Preview */}
              <div className="relative w-full h-44 sm:h-52 bg-[#ECEAE4] rounded-xl overflow-hidden mb-5 flex items-center justify-center p-3 border border-[#191919]/5">
                <div className="relative h-full aspect-[1/3] shadow-md rounded-md overflow-hidden bg-white">
                  <Image
                    src={DEFAULT_3STRIP_FRAME.frameImage}
                    alt="3-Strip Preview"
                    fill
                    sizes="160px"
                    className="object-contain"
                  />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#191919] mb-1.5 tracking-tight">
                Classic 3-Strip Edition
              </h2>
              <p className="text-xs sm:text-sm text-[#595856] leading-relaxed mb-4">
                Sesi 3 pose berurutan dengan opsi frame signature: Elegant, Retro Vintage, Bubble Cute, Dreamy, Skena, & Minimal Studio.
              </p>
            </div>

            <Button
              size="lg"
              variant="primary"
              onClick={() => startFlow("3-strip")}
              className="w-full justify-between group-hover:bg-[#2A2A2A]"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>MULAI SESI 3-STRIP</span>
              </div>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Flow Card 2: Newspaper Gazette Edition */}
          <div className="editorial-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between group hover:border-[#191919]/40 transition-all border-[#B83A24]/30">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="editorial-tag text-[#B83A24] border-[#B83A24]/30 bg-[#B83A24]/5">
                  ALUR 2 • 1 HERO FOTO
                </span>
                <span className="font-mono text-[11px] text-[#737373]">FORMAT 1414×2000 PX</span>
              </div>

              {/* Visual Thumbnail Preview */}
              <div className="relative w-full h-44 sm:h-52 bg-[#ECEAE4] rounded-xl overflow-hidden mb-5 flex items-center justify-center p-3 border border-[#191919]/5">
                <div className="relative h-full aspect-[1414/2000] shadow-md rounded-md overflow-hidden bg-white">
                  <Image
                    src={NEWSPAPER_FRAME.frameImage}
                    alt="Newspaper Gazette Preview"
                    fill
                    sizes="180px"
                    className="object-contain"
                  />
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#191919] mb-1.5 tracking-tight">
                The Skytive Gazette (Newspaper)
              </h2>
              <p className="text-xs sm:text-sm text-[#595856] leading-relaxed mb-4">
                Format poster koran editorial vintage dengan 1 pose utama. Sesi kilat: jepret 1 foto, preview instan, dan langsung unduh.
              </p>
            </div>

            <Button
              size="lg"
              variant="accent"
              onClick={() => startFlow("newspaper", NEWSPAPER_FRAME)}
              className="w-full justify-between"
            >
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4" />
                <span>MULAI NEWSPAPER EDITION</span>
              </div>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        {/* Editorial Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl text-left border-t border-[#191919]/10 pt-8"
        >
          {studioHighlights.map((feat, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-md bg-[#ECEAE4] flex items-center justify-center shrink-0">
                  {feat.icon}
                </div>
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#737373]">
                  {feat.tag}
                </span>
              </div>
              <h3 className="font-heading font-bold text-sm sm:text-base text-[#191919] mb-1">
                {feat.title}
              </h3>
              <p className="font-body text-xs text-[#595856] leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

