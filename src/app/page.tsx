"use client";

import React from "react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { LandingSection } from "@/features/landing/LandingSection";
import { FrameSelector } from "@/features/frame/FrameSelector";
import { CameraView } from "@/features/camera/CameraView";
import { PhotoEditor } from "@/features/editor/PhotoEditor";
import { DownloadView } from "@/features/download/DownloadView";

export default function Home() {
  const { step } = usePhotoboothStore();

  switch (step) {
    case "landing":
      return <LandingSection />;
    case "frame-select":
      return <FrameSelector />;
    case "camera":
      return <CameraView />;
    case "editor":
      return <PhotoEditor />;
    case "download":
      return <DownloadView />;
    default:
      return <LandingSection />;
  }
}
