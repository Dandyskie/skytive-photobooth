"use client";

import { useState, useRef, useCallback } from "react";

export function useCamera() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user",
        },
        audio: false,
      });

      setStream(mediaStream);
      setIsCameraActive(true);
      setIsPaused(false);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play().catch((err: Error) => {
          if (err.name !== "AbortError") {
            console.error("Camera play error:", err);
          }
        });
      }
    } catch (err: unknown) {
      console.error("Camera access error:", err);
      setError("Izin kamera diperlukan untuk melanjutkan photobooth.");
      setIsCameraActive(false);
    }
  }, []);

  const pauseCamera = useCallback(() => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const resumeCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch((err: Error) => {
        if (err.name !== "AbortError") {
          console.error("Camera resume error:", err);
        }
      });
      setIsPaused(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    setIsPaused(false);
  }, [stream]);

  const capturePhoto = useCallback((): string | null => {
    if (!videoRef.current) return null;

    const video = videoRef.current;
    
    // Ensure video is playing and has dimensions
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Flip horizontally for natural mirror effect (matches live video preview)
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Gunakan JPEG kualitas tinggi (0.92) untuk kompresi data URL ringan dan instan
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    return dataUrl;
  }, []);

  return {
    videoRef,
    stream,
    isCameraActive,
    isPaused,
    error,
    startCamera,
    pauseCamera,
    resumeCamera,
    stopCamera,
    capturePhoto,
  };
}
