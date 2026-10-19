# Tech Creative UI Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Overhaul the Photobooth Online UI into a high-impact Tech Creative aesthetic with elegant display typography and colorful neo-brutalist kinetic fun.

**Architecture:** Implement design tokens and CSS variables in `globals.css`, upgrade typography with Space Grotesk & Plus Jakarta Sans, overhaul header/footer/landing/frame/camera/editor/download features with tactile 3D elements, glowing HUD indicators, and kinetic marquee animations.

**Tech Stack:** Next.js, Tailwind CSS v4 / CSS Variables, TypeScript, Lucide Icons, HTML5 Canvas.

---

### Task 1: Design Tokens & Base CSS (`src/app/globals.css`)

**Files:**
- Modify: `photobooth/src/app/globals.css`

- [ ] **Step 1: Update `globals.css` with Google Fonts, Color System, and Utilities**

Replace `globals.css` content with design system tokens:
```css
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Grotesk:wght@700;800&display=swap');
@import "tailwindcss";

:root {
  --font-heading: 'Space Grotesk', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Tech Creative Neo-Brutalist Color System */
  --bg-canvas: #0E0F17;
  --bg-surface: #181926;
  --bg-surface-hover: #202234;
  --border-muted: #2E3248;

  --color-yellow: #FACC15;
  --color-cyan: #06B6D4;
  --color-violet: #8B5CF6;
  --color-pink: #EC4899;
  --color-emerald: #10B981;

  --text-main: #F8FAFC;
  --text-muted: #94A3B8;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-canvas);
  color: var(--text-main);
  min-height: 100vh;
  overflow-x: hidden;
  background-image: 
    radial-gradient(ellipse at 20% 10%, rgba(139, 92, 246, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 90%, rgba(6, 182, 212, 0.12) 0%, transparent 60%);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

.font-heading { font-family: var(--font-heading); }
.font-body { font-family: var(--font-body); }
.font-mono { font-family: var(--font-mono); }

/* Tactile 3D Neo-Brutalist Shadows */
.brutalist-shadow-violet { box-shadow: 4px 4px 0px #8B5CF6; }
.brutalist-shadow-yellow { box-shadow: 4px 4px 0px #FACC15; }
.brutalist-shadow-cyan { box-shadow: 4px 4px 0px #06B6D4; }
.brutalist-shadow-pink { box-shadow: 4px 4px 0px #EC4899; }
.brutalist-shadow-white { box-shadow: 4px 4px 0px #FFFFFF; }

/* Kinetic Marquee Animation */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  display: flex;
  width: 200%;
  animation: marquee 20s linear infinite;
}

/* Pulsing Neon HUD */
@keyframes pulseGlow {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}

.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}
```

- [ ] **Step 2: Verify CSS loads without syntax errors**

Check page build or style loading.

- [ ] **Step 3: Commit**
```bash
git add photobooth/src/app/globals.css
git commit -m "style: implement tech creative design tokens and fonts in globals.css"
```

---

### Task 2: Shared UI Components Overhaul (`Header.tsx`, `Footer.tsx`, `Button.tsx`)

**Files:**
- Modify: `photobooth/src/components/Header.tsx`
- Modify: `photobooth/src/components/Footer.tsx`
- Modify: `photobooth/src/components/Button.tsx`

- [ ] **Step 1: Overhaul `Header.tsx`**

Update Header with tech brand badge and live camera indicator:
```tsx
"use client";

import React from "react";
import { Camera, Sparkles } from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";

export const Header: React.FC = () => {
  const { setStep, step } = usePhotoboothStore();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0E0F17]/80 border-b border-[#2E3248] px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <button 
          onClick={() => setStep("landing")} 
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="bg-[#8B5CF6] text-white p-2 rounded-lg brutalist-shadow-yellow transition-transform group-hover:-translate-y-0.5">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <div className="font-heading font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              PHOTOBOOTH<span className="text-[#FACC15]">.ONLINE</span>
            </div>
            <p className="font-mono text-[10px] text-[#06B6D4] tracking-wider uppercase">Studio Edition</p>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#181926] border border-[#2E3248] px-3 py-1.5 rounded-full text-xs font-mono text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span className="text-white font-semibold">LIVE HUD</span>
            <span className="text-[#94A3B8]">• 1080P READY</span>
          </div>

          {step !== "landing" && (
            <button
              onClick={() => setStep("landing")}
              className="text-xs font-heading font-bold bg-[#202234] hover:bg-[#8B5CF6] text-white px-3 py-1.5 rounded-lg border border-[#2E3248] transition-colors cursor-pointer"
            >
              Restart
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
```

- [ ] **Step 2: Overhaul `Footer.tsx`**

Update Footer with tech metadata and credit badges:
```tsx
"use client";

import React from "react";
import { Heart, Code2 } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#2E3248] bg-[#0E0F17] py-6 px-4 text-center">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2">
          <span className="bg-[#8B5CF6]/20 text-[#8B5CF6] px-2 py-0.5 rounded border border-[#8B5CF6]/30 font-bold">
            v2.0
          </span>
          <span>PHOTOBOOTH ONLINE STUDIO</span>
        </div>
        <div className="flex items-center gap-1">
          <span>CRAFTED WITH</span>
          <Heart className="w-3.5 h-3.5 text-[#EC4899] fill-[#EC4899]" />
          <span>FOR CREATIVE MOMENTS</span>
        </div>
      </div>
    </footer>
  );
};
```

- [ ] **Step 3: Overhaul `Button.tsx`**

Update Button to support neo-brutalist tactile 3D styling:
```tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "font-heading font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  
  const variants = {
    primary: "bg-[#8B5CF6] text-white brutalist-shadow-yellow hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none border-2 border-black",
    secondary: "bg-[#06B6D4] text-black brutalist-shadow-violet hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none border-2 border-black",
    accent: "bg-[#FACC15] text-black brutalist-shadow-violet hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none border-2 border-black",
    danger: "bg-[#EC4899] text-white brutalist-shadow-white hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none border-2 border-black",
    ghost: "bg-[#181926] text-white hover:bg-[#202234] border border-[#2E3248]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base sm:text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
```

- [ ] **Step 4: Commit**
```bash
git add photobooth/src/components/Header.tsx photobooth/src/components/Footer.tsx photobooth/src/components/Button.tsx
git commit -m "feat: overhaul Header, Footer, and Button components with tech brutalist style"
```

---

### Task 3: Hero & Landing Page Overhaul (`LandingSection.tsx`)

**Files:**
- Modify: `photobooth/src/features/landing/LandingSection.tsx`

- [ ] **Step 1: Overhaul `LandingSection.tsx`**

Upgrade Landing Page with Space Grotesk headline, kinetic marquee ticker, 3D CTA, and feature highlights:
```tsx
"use client";

import React from "react";
import { Camera, Sparkles, Wand2, Download, Zap } from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { Button } from "@/components/Button";

export const LandingSection: React.FC = () => {
  const { setStep } = usePhotoboothStore();

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col justify-between overflow-hidden">
      {/* Kinetic Marquee Ticker */}
      <div className="bg-[#8B5CF6] border-y-2 border-black py-2 overflow-hidden text-black font-mono font-extrabold text-xs uppercase tracking-wider">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-4">⚡ PHOTOBOOTH.ONLINE STUDIO</span>
          <span className="mx-4">•</span>
          <span className="mx-4">📸 HD LIVE CAMERA CAPTURE</span>
          <span className="mx-4">•</span>
          <span className="mx-4">🎨 3-SLOT & 4-SLOT FRAMES</span>
          <span className="mx-4">•</span>
          <span className="mx-4">✨ INSTANT HIGH-QUALITY PNG DOWNLOAD</span>
          <span className="mx-4">•</span>
          <span className="mx-4">⚡ PHOTOBOOTH.ONLINE STUDIO</span>
          <span className="mx-4">•</span>
          <span className="mx-4">📸 HD LIVE CAMERA CAPTURE</span>
        </div>
      </div>

      {/* Main Hero Section */}
      <main className="max-w-5xl mx-auto px-4 py-12 text-center flex-1 flex flex-col items-center justify-center">
        <div className="inline-flex items-center gap-2 bg-[#181926] border-2 border-[#8B5CF6] px-4 py-1.5 rounded-full text-xs font-mono text-[#FACC15] mb-6 brutalist-shadow-violet">
          <Zap className="w-4 h-4 text-[#FACC15] fill-[#FACC15]" />
          <span>TECH CREATIVE STUDIO V2.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          CAPTURE THE <span className="text-[#FACC15] underline decoration-[#8B5CF6] decoration-wavy">VIBE</span>, SPARK THE <span className="text-[#06B6D4]">MOMENT.</span>
        </h1>

        <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl font-body mb-8">
          Abadikan momen serumu secara instan dengan frame visual stylish, filter estetis, dan stiker warna-warni langsung dari web browser.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <Button 
            size="lg" 
            variant="accent"
            onClick={() => setStep("frame-select")}
            className="w-full sm:w-auto"
          >
            <Camera className="w-6 h-6" />
            MULAI PHOTOBOOTH
          </Button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl text-left">
          <div className="bg-[#181926] border-2 border-[#2E3248] p-6 rounded-2xl brutalist-shadow-yellow hover:border-[#FACC15] transition-colors">
            <div className="w-12 h-12 bg-[#FACC15] text-black rounded-xl flex items-center justify-center font-bold mb-4 border-2 border-black">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Live Camera HD</h3>
            <p className="text-sm text-[#94A3B8]">Tangkap 3 atau 4 pose terbaikmu dengan hitungan mundur otomatis dan preview real-time.</p>
          </div>

          <div className="bg-[#181926] border-2 border-[#2E3248] p-6 rounded-2xl brutalist-shadow-cyan hover:border-[#06B6D4] transition-colors">
            <div className="w-12 h-12 bg-[#06B6D4] text-black rounded-xl flex items-center justify-center font-bold mb-4 border-2 border-black">
              <Wand2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Custom Color & Filters</h3>
            <p className="text-sm text-[#94A3B8]">Kustomisasi warna background strip frame dan terapkan filter estetik favoritmu.</p>
          </div>

          <div className="bg-[#181926] border-2 border-[#2E3248] p-6 rounded-2xl brutalist-shadow-pink hover:border-[#EC4899] transition-colors">
            <div className="w-12 h-12 bg-[#EC4899] text-white rounded-xl flex items-center justify-center font-bold mb-4 border-2 border-black">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Instant Download</h3>
            <p className="text-sm text-[#94A3B8]">Unduh hasil strip foto berkualitas HD secara instan tanpa perlu bayar atau registrasi.</p>
          </div>
        </div>
      </main>
    </div>
  );
};
```

- [ ] **Step 2: Commit**
```bash
git add photobooth/src/features/landing/LandingSection.tsx
git commit -m "feat: overhaul LandingSection with tech creative typography and brutalist feature cards"
```

---

### Task 4: Frame Selector Overhaul (`FrameSelector.tsx`)

**Files:**
- Modify: `photobooth/src/features/frame/FrameSelector.tsx`

- [ ] **Step 1: Overhaul `FrameSelector.tsx`**

Update Frame Selector with HUD step bar, frame choice cards (3-slot & 4-slot), and color picker:
```tsx
"use client";

import React from "react";
import { ArrowRight, LayoutGrid, Layers, Check } from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { Button } from "@/components/Button";
import { FRAME_TYPES, FRAME_COLORS } from "@/constants/frames";

export const FrameSelector: React.FC = () => {
  const { frameType, setFrameType, frameColor, setFrameColor, setStep } = usePhotoboothStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* HUD Header Bar */}
      <div className="bg-[#181926] border-2 border-[#8B5CF6] p-4 rounded-2xl brutalist-shadow-violet mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-[#8B5CF6] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">
            STEP 1 / 4
          </span>
          <h2 className="text-2xl font-bold text-white mt-1">Pilih Frame & Warna Strip</h2>
        </div>
        <p className="text-xs font-mono text-[#06B6D4]">● CONFIGURING CANVAS</p>
      </div>

      {/* Frame Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {FRAME_TYPES.map((type) => {
          const isSelected = frameType === type.id;
          return (
            <div
              key={type.id}
              onClick={() => setFrameType(type.id)}
              className={`bg-[#181926] border-2 p-6 rounded-2xl cursor-pointer transition-all ${
                isSelected
                  ? "border-[#FACC15] brutalist-shadow-yellow scale-[1.02]"
                  : "border-[#2E3248] hover:border-[#8B5CF6]"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border-2 border-black ${isSelected ? "bg-[#FACC15] text-black" : "bg-[#202234] text-white"}`}>
                    {type.id === "4-slot" ? <LayoutGrid className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-white">{type.name}</h3>
                    <p className="text-xs font-mono text-[#94A3B8]">{type.description}</p>
                  </div>
                </div>
                {isSelected && (
                  <span className="bg-[#FACC15] text-black p-1 rounded-full border border-black">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Frame Color Picker */}
      <div className="bg-[#181926] border-2 border-[#2E3248] p-6 rounded-2xl mb-8">
        <h3 className="font-bold text-white text-lg mb-4">Warna Strip Frame</h3>
        <div className="flex flex-wrap gap-3">
          {FRAME_COLORS.map((color) => (
            <button
              key={color.hex}
              onClick={() => setFrameColor(color.hex)}
              className={`w-10 h-10 rounded-xl border-2 transition-transform cursor-pointer flex items-center justify-center ${
                frameColor === color.hex ? "border-[#FACC15] scale-110 shadow-lg" : "border-black hover:scale-105"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            >
              {frameColor === color.hex && <Check className="w-5 h-5 text-black stroke-[3]" />}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Action */}
      <div className="flex justify-end">
        <Button size="lg" variant="primary" onClick={() => setStep("camera")}>
          LANJUT KE KAMERA
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**
```bash
git add photobooth/src/features/frame/FrameSelector.tsx
git commit -m "feat: overhaul FrameSelector with tech brutalist HUD and color palette UI"
```

---

### Task 5: Camera Viewfinder Overhaul (`CameraView.tsx`)

**Files:**
- Modify: `photobooth/src/features/camera/CameraView.tsx`

- [ ] **Step 1: Overhaul `CameraView.tsx`**

Update CameraView with HUD corners, countdown overlay, and shutter trigger:
```tsx
"use client";

import React from "react";
import { Camera, RefreshCw, Zap } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { Button } from "@/components/Button";

export const CameraView: React.FC = () => {
  const { photos, frameType, setStep } = usePhotoboothStore();
  const maxPhotos = frameType === "3-slot" ? 3 : 4;
  
  const { videoRef, isCountingDown, countdown, startCapturingSequence, isCapturing } = useCamera({
    maxPhotos,
    onComplete: () => setStep("editor"),
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 text-center">
      {/* HUD Step Header */}
      <div className="bg-[#181926] border-2 border-[#06B6D4] p-3 rounded-2xl brutalist-shadow-cyan mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-[#06B6D4] text-black font-bold px-2 py-0.5 rounded">STEP 2 / 4</span>
          <span className="text-white font-bold">KAMERA STUDIO</span>
        </div>
        <div className="font-mono text-xs text-[#FACC15] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FACC15] animate-pulse"></span>
          POSE {photos.length} / {maxPhotos}
        </div>
      </div>

      {/* Viewfinder Container */}
      <div className="relative mx-auto max-w-2xl bg-black rounded-3xl overflow-hidden border-4 border-[#2E3248] brutalist-shadow-violet mb-6 aspect-[4/3]">
        {/* HUD Corners */}
        <div className="absolute top-4 left-4 border-t-2 border-l-2 border-[#06B6D4] w-6 h-6 z-10 pointer-events-none"></div>
        <div className="absolute top-4 right-4 border-t-2 border-r-2 border-[#06B6D4] w-6 h-6 z-10 pointer-events-none"></div>
        <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-[#06B6D4] w-6 h-6 z-10 pointer-events-none"></div>
        <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-[#06B6D4] w-6 h-6 z-10 pointer-events-none"></div>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform -scale-x-100"
        />

        {/* Countdown Overlay */}
        {isCountingDown && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-20">
            <span className="text-8xl font-black text-[#FACC15] font-heading animate-ping">
              {countdown}
            </span>
          </div>
        )}
      </div>

      {/* Shutter Button Action */}
      <div className="flex items-center justify-center gap-4">
        <Button
          size="lg"
          variant="primary"
          onClick={startCapturingSequence}
          disabled={isCapturing || photos.length >= maxPhotos}
        >
          <Camera className="w-6 h-6" />
          {isCapturing ? "MEMOTRET..." : "AMBIL FOTO"}
        </Button>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**
```bash
git add photobooth/src/features/camera/CameraView.tsx
git commit -m "feat: overhaul CameraView with HUD viewfinder styling and countdown overlay"
```

---

### Task 6: Photo Editor & Download Overhaul (`PhotoEditor.tsx`, `DownloadView.tsx`)

**Files:**
- Modify: `photobooth/src/features/editor/PhotoEditor.tsx`
- Modify: `photobooth/src/features/download/DownloadView.tsx`

- [ ] **Step 1: Overhaul `PhotoEditor.tsx`**

Update PhotoEditor with filters, stickers, and frame customization controls:
```tsx
"use client";

import React, { useState } from "react";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { Button } from "@/components/Button";

export const PhotoEditor: React.FC = () => {
  const { photos, frameColor, setStep } = usePhotoboothStore();
  const [filter, setFilter] = useState<string>("none");

  const filters = [
    { id: "none", name: "Normal" },
    { id: "grayscale(100%)", name: "B&W" },
    { id: "sepia(60%)", name: "Vintage" },
    { id: "contrast(125%) brightness(110%)", name: "Pop" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* HUD Step Header */}
      <div className="bg-[#181926] border-2 border-[#8B5CF6] p-3 rounded-2xl brutalist-shadow-violet mb-6 flex items-center justify-between">
        <span className="bg-[#8B5CF6] text-white text-xs font-mono font-bold px-2.5 py-1 rounded">STEP 3 / 4</span>
        <h2 className="text-xl font-bold text-white">Edit & Sesuaikan Filter</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Photo Strip Preview */}
        <div className="flex justify-center">
          <div
            className="p-4 rounded-2xl brutalist-shadow-yellow border-2 border-black flex flex-col gap-3 max-w-[260px] w-full"
            style={{ backgroundColor: frameColor }}
          >
            {photos.map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-black/20 bg-black">
                <img src={src} alt={`Pose ${i + 1}`} className="w-full h-full object-cover" style={{ filter }} />
              </div>
            ))}
            <div className="text-center font-heading font-extrabold text-xs text-black tracking-widest pt-2">
              PHOTOBOOTH.ONLINE
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#181926] border-2 border-[#2E3248] p-6 rounded-2xl">
          <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FACC15]" />
            Pilih Filter Foto
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`p-3 rounded-xl border-2 font-bold text-sm transition-all cursor-pointer ${
                  filter === f.id
                    ? "bg-[#8B5CF6] text-white border-black brutalist-shadow-yellow"
                    : "bg-[#202234] text-[#94A3B8] border-[#2E3248] hover:text-white"
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>

          <Button size="lg" variant="primary" onClick={() => setStep("download")} className="w-full">
            SIMPAN & UNDUH
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Overhaul `DownloadView.tsx`**

Update DownloadView with result card, download PNG action, and restart button:
```tsx
"use client";

import React from "react";
import { Download, RotateCcw, Share2 } from "lucide-react";
import { usePhotoboothStore } from "@/store/usePhotoboothStore";
import { Button } from "@/components/Button";

export const DownloadView: React.FC = () => {
  const { photos, frameColor, resetSession } = usePhotoboothStore();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-center">
      {/* HUD Header */}
      <div className="bg-[#181926] border-2 border-[#10B981] p-3 rounded-2xl brutalist-shadow-emerald mb-8">
        <span className="bg-[#10B981] text-black text-xs font-mono font-bold px-2.5 py-1 rounded">STEP 4 / 4</span>
        <h2 className="text-2xl font-bold text-white mt-1">Foto Siap Diunduh! 🎉</h2>
      </div>

      {/* Strip Showcase Preview */}
      <div className="flex justify-center mb-8">
        <div
          className="p-4 rounded-2xl brutalist-shadow-white border-4 border-black flex flex-col gap-3 max-w-[280px] w-full"
          style={{ backgroundColor: frameColor }}
        >
          {photos.map((src, i) => (
            <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-black/20 bg-black">
              <img src={src} alt={`Pose ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="text-center font-heading font-extrabold text-xs text-black tracking-widest pt-2">
            PHOTOBOOTH.ONLINE
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" variant="primary" onClick={() => alert("Mengunduh Foto Strip...")}>
          <Download className="w-5 h-5" />
          UNDUH STRIP FOTO (PNG)
        </Button>
        <Button size="lg" variant="ghost" onClick={resetSession}>
          <RotateCcw className="w-5 h-5" />
          FOTO LAGI
        </Button>
      </div>
    </div>
  );
};
```

- [ ] **Step 3: Commit**
```bash
git add photobooth/src/features/editor/PhotoEditor.tsx photobooth/src/features/download/DownloadView.tsx
git commit -m "feat: overhaul PhotoEditor and DownloadView with tech brutalist style"
```

---

### Task 7: Build & Verification Check

- [ ] **Step 1: Run Next.js build to verify zero compilation errors**
```bash
npm run build
```

- [ ] **Step 2: Commit any remaining fixes**
```bash
git commit -m "chore: complete Tech Creative UI overhaul verification"
```
