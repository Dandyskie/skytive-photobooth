"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera as CameraIcon,
  AlertCircle,
  RefreshCw,
  Pause,
  Play,
  Check,
  Maximize,
  Minimize,
  Clock,
} from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { useCamera } from "@/hooks/useCamera";
import { Button } from "@/components/Button";
import { TIMERS } from "@/constants/frames";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const CameraView: React.FC = () => {
  const {
    flowType,
    selectedFrame,
    selectedTimer,
    setSelectedTimer,
    photos,
    setPhotos,
    setStep,
  } = usePhotoboothStore();

  const {
    videoRef,
    isPaused,
    error,
    startCamera,
    pauseCamera,
    resumeCamera,
    stopCamera,
    capturePhoto,
  } = useCamera();

  const [isSequenceActive, setIsSequenceActive] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showFlash, setShowFlash] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const isSequenceActiveRef = useRef<boolean>(false);
  const startCameraRef = useRef(startCamera);
  const stopCameraRef = useRef(stopCamera);

  useEffect(() => {
    startCameraRef.current = startCamera;
    stopCameraRef.current = stopCamera;
  });

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

  useEffect(() => {
    isSequenceActiveRef.current = false;
    startCameraRef.current();

    return () => {
      isSequenceActiveRef.current = false;
      stopCameraRef.current();
    };
  }, []);

  const playShutterSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.12);
      setTimeout(() => {
        ctx.close().catch(() => {});
      }, 300);
    } catch {
      // ignore sound playback restrictions if any
    }
  };

  const startSession = async () => {
    if (isPaused) resumeCamera();

    isSequenceActiveRef.current = true;
    setIsSequenceActive(true);
    setPhotos([]);

    const total = selectedFrame.photoCount;
    const accumulatedPhotos: string[] = [];

    for (let slot = 0; slot < total; slot++) {
      if (!isSequenceActiveRef.current) break;

      for (let sec = selectedTimer; sec > 0; sec--) {
        if (!isSequenceActiveRef.current) break;
        setCountdown(sec);
        await sleep(1000);
      }

      if (!isSequenceActiveRef.current) break;

      // Moment of capture
      setCountdown(0);
      setShowFlash(true);
      playShutterSound();

      const photoData = capturePhoto();
      if (photoData) {
        accumulatedPhotos.push(photoData);
        setPhotos([...accumulatedPhotos]);
      }

      // Flash feedback
      await sleep(350);
      setShowFlash(false);

      if (slot < total - 1) {
        await sleep(700);
      }
    }

    if (isSequenceActiveRef.current) {
      setCountdown(null);
      await sleep(400);
      setIsSequenceActive(false);
      isSequenceActiveRef.current = false;
      stopCameraRef.current();
      setPhotos([...accumulatedPhotos]);
      setStep("editor");
    }
  };

  const handleCancel = () => {
    isSequenceActiveRef.current = false;
    setIsSequenceActive(false);
    setCountdown(null);
    stopCameraRef.current();
    setStep(flowType === "newspaper" ? "landing" : "frame-select");
  };

  const currentSlotIndex = photos.length;

  return (
    <div className="w-full max-w-3xl mx-auto px-3 sm:px-6 py-4 sm:py-6 flex flex-col items-center">
      {/* 1. Soft White Prep Light when countdown is running */}
      <AnimatePresence>
        {isSequenceActive && countdown !== null && countdown > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-[1px] z-40 pointer-events-none flex flex-col items-center justify-start pt-16 sm:pt-24 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#191919] text-[#F5F3EE] px-5 sm:px-7 py-2.5 rounded-full border border-white/20 shadow-lg font-mono text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#B83A24] animate-ping shrink-0" />
              <span>BERSIAP POSE • HITUNGAN: {countdown}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Shutter Flash Overlay */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-[9999] pointer-events-none flex items-center justify-center"
          >
            <motion.span
              initial={{ scale: 1.1, opacity: 1 }}
              animate={{ scale: 1.3, opacity: 0 }}
              className="font-heading font-black text-4xl sm:text-6xl text-[#191919] tracking-tight"
            >
              CAPTURE
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial HUD Bar */}
      <div className="w-full max-w-2xl bg-[#FAF9F5] border border-[#191919]/15 p-3 sm:p-4 rounded-2xl mb-4 sm:mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="editorial-tag">LANGKAH 02 / 03</span>
          <span className="text-[#191919] font-heading font-bold text-xs sm:text-sm truncate">
            {selectedFrame.name}
          </span>
          <span className="hidden sm:inline-block text-[#737373]">•</span>
          <span className="hidden sm:inline-block text-[#737373] text-[11px]">
            {selectedFrame.photoCount} FOTO
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!error && (
            <button
              onClick={isPaused ? resumeCamera : pauseCamera}
              className="text-xs font-mono font-medium text-[#191919] bg-[#FAF9F5] hover:bg-[#ECEAE4] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#191919]/20 transition-all cursor-pointer flex items-center gap-1.5 min-h-[32px]"
            >
              {isPaused ? (
                <Play className="w-3 h-3 fill-current text-[#191919]" />
              ) : (
                <Pause className="w-3 h-3 fill-current text-[#737373]" />
              )}
              <span className="hidden xs:inline">{isPaused ? "RESUME" : "PAUSE"}</span>
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center gap-1 text-xs font-mono font-medium text-[#191919] bg-[#FAF9F5] hover:bg-[#ECEAE4] px-2.5 py-1.5 rounded-lg border border-[#191919]/20 transition-all cursor-pointer min-h-[32px]"
            title={isFullscreen ? "Keluar Layar Penuh" : "Mode Layar Penuh"}
          >
            {isFullscreen ? (
              <Minimize className="w-3 h-3" />
            ) : (
              <Maximize className="w-3 h-3" />
            )}
          </button>

          <button
            onClick={handleCancel}
            className="text-xs font-mono text-[#737373] hover:text-[#B83A24] px-2 py-1 rounded transition-colors cursor-pointer"
          >
            BATAL
          </button>
        </div>
      </div>

      {/* Main Live Camera Viewfinder */}
      <div className="relative w-full max-w-2xl aspect-[4/3] max-h-[52vh] sm:max-h-none bg-[#111111] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#191919]/30 shadow-md mb-2.5 sm:mb-3">
        {/* Editorial Viewfinder Crosshairs */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 border-t border-l border-white/40 w-4 h-4 sm:w-6 sm:h-6 z-10 pointer-events-none" />
        <div className="absolute top-3 right-3 sm:top-5 sm:right-5 border-t border-r border-white/40 w-4 h-4 sm:w-6 sm:h-6 z-10 pointer-events-none" />
        <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 border-b border-l border-white/40 w-4 h-4 sm:w-6 sm:h-6 z-10 pointer-events-none" />
        <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 border-b border-r border-white/40 w-4 h-4 sm:w-6 sm:h-6 z-10 pointer-events-none" />

        {/* Center Focus Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30">
          <div className="w-12 h-12 border border-white/50 rounded-full" />
          <div className="absolute w-2 h-2 bg-white/70 rounded-full" />
        </div>

        {/* Status Indicator */}
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-white/90">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>REC • LIVE HD</span>
        </div>

        {/* Pause Indicator */}
        {isPaused && (
          <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 bg-[#191919] text-[#F5F3EE] text-[10px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 border border-white/20">
            <Pause className="w-3 h-3 fill-white text-white" />
            <span>KAMERA DIJEDA</span>
          </div>
        )}

        {/* Camera Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform -scale-x-100"
        />

        {/* Countdown Overlay */}
        <AnimatePresence>
          {isSequenceActive && countdown !== null && (
            <motion.div
              key={countdown}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px] z-30 pointer-events-none"
            >
              <span className="font-heading font-black text-8xl sm:text-9xl text-white drop-shadow-md">
                {countdown > 0 ? countdown : "✨"}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Screen */}
        {error && (
          <div className="absolute inset-0 bg-[#FAF9F5] flex flex-col items-center justify-center p-6 text-center z-50">
            <AlertCircle className="w-10 h-10 text-[#B83A24] mb-3" />
            <h3 className="font-heading font-bold text-lg text-[#191919] mb-1">
              Kamera Tidak Dapat Diakses
            </h3>
            <p className="text-xs font-body text-[#595856] mb-5 max-w-sm">{error}</p>
            <Button onClick={startCamera} variant="primary" size="md">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span>Coba Akses Lagi</span>
            </Button>
          </div>
        )}
      </div>

      {/* Primary Action Console Bar (LANGSUNG TEPAT DI BAWAH LIVE CAM) */}
      <div className="w-full max-w-2xl bg-[#FAF9F5] p-3 sm:p-3.5 rounded-2xl border border-[#191919]/15 mb-3 shadow-xs">
        {!isSequenceActive && !error ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Pilihan Durasi Timer */}
            <div className="flex items-center justify-between sm:justify-start gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-[#191919]">
                <Clock className="w-3.5 h-3.5 text-[#191919]" />
                <span>TIMER:</span>
              </div>
              <div className="flex items-center gap-1 bg-[#ECEAE4] p-1 rounded-xl">
                {TIMERS.map((timer) => (
                  <button
                    key={timer}
                    onClick={() => setSelectedTimer(timer)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedTimer === timer
                        ? "bg-[#191919] text-[#F5F3EE] shadow-xs"
                        : "text-[#737373] hover:text-[#191919]"
                    }`}
                  >
                    {timer} DETIK
                  </button>
                ))}
              </div>
            </div>

            {/* Tombol Shutter Utama */}
            <Button
              size="lg"
              variant="primary"
              onClick={startSession}
              className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-heading font-bold tracking-normal shadow-sm"
            >
              <CameraIcon className="w-4 h-4 mr-2" />
              <span>
                {photos.length > 0
                  ? "FOTO ULANG SESI"
                  : `AMBIL FOTO (${selectedFrame.photoCount} POSE)`}
              </span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-center py-1.5 text-xs font-mono font-semibold text-[#B83A24] gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B83A24] animate-ping" />
            <span>
              {photos.length < selectedFrame.photoCount
                ? `SEDANG MENGAMBIL POSE ${photos.length + 1} DARI ${selectedFrame.photoCount}... BERSIAP POSE!`
                : "MEMPROSES HASIL FOTO KE PREVIEW..."}
            </span>
          </div>
        )}
      </div>

      {/* Captured Photo Thumbnails Bar (Di Bawah Console Controls) */}
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[10px] sm:text-[11px] font-mono font-medium text-[#737373] uppercase">
            Hasil Jepretan ({photos.length}/{selectedFrame.photoCount}):
          </span>
          <span className="text-[10px] font-mono text-[#A3A29E]">
            {photos.length === selectedFrame.photoCount
              ? "Lengkap! Menuju editor..."
              : "Foto otomatis masuk ke frame"}
          </span>
        </div>

        {/* Thumbnails Row */}
        <div
          className="grid gap-2 sm:gap-2.5"
          style={{ gridTemplateColumns: `repeat(${selectedFrame.photoCount}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: selectedFrame.photoCount }).map((_, idx) => {
            const capturedPhoto = photos[idx];
            const isActive = isSequenceActive && idx === currentSlotIndex;

            return (
              <div
                key={idx}
                className={`relative aspect-[4/3] rounded-xl overflow-hidden bg-[#ECEAE4] border transition-all flex items-center justify-center ${
                  capturedPhoto
                    ? "border-[#191919] shadow-xs"
                    : isActive
                    ? "border-[#B83A24] ring-2 ring-[#B83A24]/30 animate-pulse"
                    : "border-[#191919]/15"
                }`}
              >
                {capturedPhoto ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={capturedPhoto}
                      alt={`Thumbnail Pose ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1.5 right-1.5 bg-[#191919] text-[#F5F3EE] p-0.5 rounded-full shadow-xs">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  </>
                ) : (
                  <span className="text-[11px] font-mono font-medium text-[#737373]">
                    POSE {idx + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

