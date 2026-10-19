# Tech Creative UI Overhaul Specification (Option C: Kinetic Neo-Brutalist Fun)

## Overview
This specification details the comprehensive UI/UX overhaul of the Photobooth Online application. The redesign transforms the current aesthetic into a high-energy **Tech Creative** vibe dominated by **elegant display typography** and **colorful fun neo-brutalist interactions**.

---

## 1. Design System Architecture & Design Tokens (`globals.css`)

### 1.1 Typography Tokens
- **Display Headings (`--font-display`)**: `Space Grotesk`, sans-serif (800 / ExtraBold, 700 / Bold) - Used for major section titles, step indicators, and bold display text.
- **Body Text (`--font-body`)**: `Plus Jakarta Sans`, sans-serif (500 / 600 / 700) - Used for instructions, descriptions, and UI button labels.
- **Tech / HUD Mono (`--font-mono`)**: `JetBrains Mono`, monospace (700 Bold) - Used for status indicators, timers, resolution tags, and camera metadata.

### 1.2 Color Architecture
- **Primitive Tokens**:
  - `Canvas Dark`: `#0E0F17` (Deep slate studio black)
  - `Surface Dark`: `#181926` (Card container background)
  - `Surface Subtle`: `#202234` (Hover card state)
  - `Neon Sunburst Yellow`: `#FACC15`
  - `Electric Cyan`: `#06B6D4`
  - `Hyper Violet`: `#8B5CF6`
  - `Hot Magenta Pink`: `#EC4899`
  - `Vivid Emerald`: `#10B981`
  - `Border Contrast`: `#334155` / `#8B5CF6`

- **Semantic & Component Tokens**:
  - `--bg-canvas`: `var(--color-canvas-dark)`
  - `--bg-card`: `var(--color-surface-dark)`
  - `--color-accent-yellow`: `#FACC15`
  - `--color-accent-cyan`: `#06B6D4`
  - `--color-accent-violet`: `#8B5CF6`
  - `--color-accent-pink`: `#EC4899`
  - `--shadow-brutalist-violet`: `4px 4px 0px #8B5CF6`
  - `--shadow-brutalist-yellow`: `4px 4px 0px #FACC15`
  - `--shadow-brutalist-cyan`: `4px 4px 0px #06B6D4`

### 1.3 Micro-Animations & Utilities
- Kinetic marquee banner continuous scrolling keyframe.
- Pulse neon HUD glow animation for live camera status & active countdown timer.
- Tactile 3D button press state (`active:translate-x-[2px] active:translate-y-[2px] active:shadow-none`).
- Hover card scale & badge wiggle effect.

---

## 2. Component-by-Component Specification

### 2.1 Header & Footer Navigation (`src/components/Header.tsx`, `Footer.tsx`)
- **Header**:
  - Neo-brutalist brand badge `PHOTOBOOTH.STUDIO`.
  - Tech status pill badge with pulsing cyan live indicator: `● LIVE HD CAMERA ONLINE`.
  - Quick action restart/home link with hover glow.
- **Footer**:
  - Sleek tech creative copyright & credit badge.
  - Social & GitHub links formatted in mono badge style.

### 2.2 Landing Page (`src/features/landing/LandingSection.tsx`)
- Hero banner with oversized Space Grotesk headline: `"CAPTURE THE VIBE • SPARK THE MOMENT"`.
- Continuous kinetic marquee ticker running across the hero background (`PHOTOBOOTH ONLINE • 3-SLOT STRIP • 4-SLOT GRID • INSTANT HD DOWNLOAD`).
- Tactile high-impact CTA button `"START PHOTOBOOTH"` with 3D shadow press effect.
- 3 Feature highlight cards in Neo-brutalist color themes (Cyan, Pink, Violet).

### 2.3 Frame Selector (`src/features/frame/FrameSelector.tsx`)
- Step progress HUD indicator: `STEP 1 / 4 • CHOOSE FRAME LAYOUT`.
- Frame slot selection cards (3-Slot Vertical Strip vs 4-Slot Quad Grid) with interactive hover states and tactile selection outline.
- Frame background color selector with vivid preset pills + custom color input.
- Primary CTA `"CONTINUE TO CAMERA ->"`.

### 2.4 Camera Viewfinder (`src/features/camera/CameraView.tsx`)
- Viewfinder container with tech HUD corner indicators, resolution badge (`1080x1920 HD`), and focus crosshair overlays.
- Large countdown display overlaid on live stream with neon glowing pulse numbers (`3... 2... 1...`).
- Multi-photo shot progress strip (showing thumbnails of captured poses).
- Camera controls: Tactile shutter trigger button, switch camera toggle, retake pose trigger.

### 2.5 Photo Strip Editor (`src/features/editor/PhotoEditor.tsx`)
- Side-by-side interactive studio layout:
  - Left: Real-time render of photo strip with current background color & frame choice.
  - Right: Tech tab control panel for Filters (Original, B&W, Cyber Neon, Vintage Warm, Vivid Pop), Stickers overlay, and Frame background color fine-tuning.
- Action bar: `"DOWNLOAD PHOTO STRIP"` & `"RETAKE FOTOS"`.

### 2.6 Download & Share View (`src/features/download/DownloadView.tsx`)
- Final result showcase card with neo-brutalist border frame.
- Download PNG button with instant high-quality canvas export.
- Share link / Copy to clipboard feedback toast.
- Restart session button `"TAKE NEW PHOTOS"`.

---

## 3. Verification & Quality Assurance Plan
1. **Visual Consistency Check**: Ensure all steps adhere strictly to design tokens, font scales, and color schemes.
2. **Interactive States**: Verify hover, focus, active tactile button press, and marquee animation performance.
3. **Responsive Testing**: Test layout rendering on mobile (375px+), tablet, and desktop viewports.
4. **Camera & Download Functionality**: Ensure photo capture sequence, filter canvas application, and PNG download export remain 100% functional.
