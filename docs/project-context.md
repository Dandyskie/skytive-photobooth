# 📸 PROJECT_CONTEXT.md

> Project Context & Technical Documentation

---

# Project Information

## Project Name

SnapMoment

> (Temporary Name)

---

## Project Type

Online Photobooth Website

---

## Version

v1.0.0 (MVP)

---

## Status

Planning

---

## Author

Dandy Rama Wiguna

---

# Project Overview

SnapMoment adalah website photobooth online yang memungkinkan pengguna mengambil foto langsung melalui kamera browser tanpa perlu menginstal aplikasi.

Website berfokus pada pengalaman pengguna yang sederhana, cepat, menyenangkan, dan aesthetic dengan visual bergaya Modern Y2K serta Korean Photobooth.

Seluruh proses dilakukan langsung di browser, mulai dari memilih frame, mengambil foto, mengatur posisi foto, hingga mengunduh hasil akhir.

---

# Vision

Membangun pengalaman photobooth online yang ringan, modern, menyenangkan, dan mudah digunakan oleh siapa pun.

---

# Mission

- Memberikan pengalaman photobooth langsung dari browser.
- Tidak memerlukan instalasi aplikasi.
- Memiliki UI yang menarik dan modern.
- Mudah digunakan pada desktop maupun mobile.
- Menjadi portfolio frontend yang menunjukkan kemampuan Web API, Canvas, dan UI Engineering.

---

# Goals

MVP Goals

- User dapat memilih frame.
- User dapat menggunakan kamera.
- User dapat mengambil beberapa foto otomatis.
- User dapat melihat preview.
- User dapat mengatur posisi foto.
- User dapat mengunduh hasil.

Future Goals

- Dashboard Admin
- Upload Frame
- Premium Template
- QR Download
- AI Background Removal
- Filter
- Sticker
- Text Editor

---

# Target Users

- Mahasiswa
- Pelajar
- Pasangan
- Teman
- Event Organizer
- Content Creator

---

# Core Features (MVP)

## Landing Page

- Hero Section
- CTA
- Feature Section
- Preview
- FAQ

---

## Frame Selection

MVP hanya menyediakan tiga frame.

Semua frame menggunakan layout yang sama.

Perbedaan hanya pada:

- warna
- dekorasi
- typography

---

## Camera

User memberikan izin kamera.

Browser menggunakan MediaDevices API.

Tidak menggunakan plugin eksternal.

---

## Timer

Pilihan timer

- 3 detik
- 5 detik

---

## Auto Capture

Jumlah foto mengikuti jumlah slot frame.

Contoh

Frame

4 Slot

↓

Capture

4 kali otomatis

---

## Preview

User dapat

- Drag
- Zoom

Frame tidak dapat dipindahkan.

---

## Download

Sebelum download muncul modal support creator.

Modal berisi

- Follow Instagram
- I Already Followed

Tidak ada verifikasi follow.

---

# User Flow

Landing

↓

Choose Frame

↓

Allow Camera

↓

Select Timer

↓

Countdown

↓

Capture Photo 1

↓

Capture Photo 2

↓

Capture Photo 3

↓

Capture Photo 4

↓

Preview

↓

Edit Position

↓

Support Creator Modal

↓

Download

---

# MVP Scope

Included

✅ Landing Page

✅ 3 Frame

✅ Camera

✅ Timer

✅ Auto Capture

✅ Preview

✅ Drag

✅ Zoom

✅ Download PNG

Excluded

❌ Login

❌ Database

❌ Dashboard

❌ Payment

❌ AI

❌ Sticker

❌ Filter

❌ Text

❌ QR Download

❌ History

---

# Technical Stack

Frontend

- Next.js 15
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Framer Motion

State

- Zustand

Validation

- Zod

Camera

- MediaDevices API

Canvas

- Konva.js

Icons

- Lucide React

Notification

- Sonner

Deployment

- Vercel

---

# Project Structure

src/

app/

components/

features/

hooks/

lib/

store/

types/

constants/

public/

docs/

---

# Feature Modules

Landing

Camera

Frame

Preview

Editor

Download

Support Creator

---

# Folder Responsibilities

app/

Routing.

components/

Reusable UI.

features/

Business Logic.

hooks/

Reusable Hooks.

lib/

Utilities.

store/

Global State.

types/

TypeScript Types.

constants/

Static Data.

public/

Images, Frame, Assets.

---

# State Management

Global

- selectedFrame
- timer
- photos
- preview
- currentCapture
- captureFinished

---

# Data Flow

Choose Frame

↓

Open Camera

↓

Capture

↓

Save Images

↓

Preview

↓

Edit

↓

Export PNG

↓

Download

---

# Camera Flow

Request Camera Permission

↓

Live Camera

↓

Countdown

↓

Capture

↓

Store Image

↓

Next Countdown

↓

Repeat

↓

Preview

---

# Frame System

Frame menggunakan PNG transparan.

Semua frame memiliki ukuran yang sama.

MVP menggunakan satu layout.

Perbedaan frame hanya pada visual.

---

# Image Processing

Camera

↓

Canvas

↓

Merge

↓

Preview

↓

Export PNG

---

# Export

Output

PNG

High Resolution

Client Side

---

# Performance Goals

Fast Initial Load

Responsive

Lazy Loading

Optimized Images

Minimal Re-render

---

# Browser Support

Chrome

Edge

Safari

Firefox

Latest Version Only

---

# Responsive

Desktop

Tablet

Mobile

Landscape

Portrait

---

# Accessibility

Minimum Font

16px

Minimum Button

44px

Keyboard Navigation

Proper Contrast

---

# Coding Convention

Use TypeScript.

Use Functional Component.

Use App Router.

Prefer Server Components.

Use Client Component only when needed.

Avoid duplicate components.

Prefer reusable components.

No inline CSS.

No hardcoded color values.

---

# Naming Convention

PascalCase

Components

camelCase

Variables

UPPER_CASE

Constants

kebab-case

Folders

---

# Git Convention

feat:

fix:

style:

docs:

refactor:

chore:

---

# Deployment

Frontend

Vercel

---

# Future Roadmap

v1.1

- More Frames

v1.2

- Sticker

v1.3

- Text

v2.0

- Dashboard

- Upload Frame

- Login

v3.0

- Premium

- Payment

- AI

---

# Success Metrics

User dapat menyelesaikan proses photobooth tanpa kebingungan.

Capture berjalan lancar.

Download berhasil.

UI terasa ringan.

Animation halus.

Tidak ada blocking UX.

---

# Project Principles

Keep It Simple.

Cute but Functional.

Performance First.

Mobile Friendly.

Reusable Components.

Consistent UI.

Delightful Experience.

Build for Users.
