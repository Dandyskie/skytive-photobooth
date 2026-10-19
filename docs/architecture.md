# 🏗️ ARCHITECTURE.md

> SnapMoment Technical Architecture
>
> Version: 1.0.0

---

# Architecture Overview

SnapMoment menggunakan arsitektur Frontend Modular.

Project dipisahkan berdasarkan feature, bukan berdasarkan halaman.

Setiap feature bertanggung jawab terhadap business logic masing-masing.

UI dibuat reusable agar mudah dikembangkan.

---

# Tech Stack

Framework

- Next.js 15 (App Router)

Language

- TypeScript

Styling

- Tailwind CSS v4

UI Components

- shadcn/ui

Animation

- Framer Motion

State Management

- Zustand

Canvas Engine

- Konva.js

Schema Validation

- Zod

Icons

- Lucide React

Notifications

- Sonner

Deployment

- Vercel

---

# Architecture Pattern

Presentation Layer

↓

Feature Layer

↓

State Layer

↓

Utility Layer

↓

Browser APIs

---

# Folder Structure

src/

app/

components/

features/

hooks/

lib/

store/

types/

constants/

styles/

public/

---

# Folder Responsibilities

## app/

Routing menggunakan App Router.

Berisi page dan layout.

Tidak boleh menyimpan business logic.

---

## components/

Reusable UI.

Contoh

Button

Dialog

Card

Input

Navbar

Footer

---

## features/

Berisi seluruh business logic.

Contoh

camera/

editor/

download/

frame/

landing/

support/

---

## hooks/

Reusable hooks.

Contoh

useCamera()

useCountdown()

useCapture()

useDownload()

---

## store/

Global state menggunakan Zustand.

---

## lib/

Utilities.

Contoh

mergeImages()

downloadImage()

canvasHelper()

timerHelper()

---

## constants/

Static data.

Contoh

frames

timers

colors

links

---

## types/

Semua interface dan type.

---

## public/

Assets.

Frame PNG

Images

Icons

---

# Feature Architecture

Landing

↓

Frame Selection

↓

Camera

↓

Capture

↓

Editor

↓

Download

---

# Module Overview

Landing

Menampilkan homepage.

Tidak memiliki business logic.

---

Frame

Menampilkan daftar frame.

Mengatur frame aktif.

---

Camera

Mengakses kamera browser.

Mengelola preview kamera.

Mengambil gambar.

---

Countdown

Mengatur timer.

3 detik.

5 detik.

---

Capture

Melakukan auto capture.

Loop sesuai jumlah slot.

---

Editor

Drag foto.

Zoom foto.

Preview.

---

Download

Merge frame.

Generate PNG.

Download.

---

Support

Modal Follow Instagram.

---

# State Management

Menggunakan Zustand.

Global State

selectedFrame

selectedTimer

capturedPhotos

currentCapture

captureProgress

editorState

downloadReady

---

# Data Flow

Landing

↓

Choose Frame

↓

Choose Timer

↓

Camera Permission

↓

Countdown

↓

Capture

↓

Save Images

↓

Editor

↓

Generate Image

↓

Download

---

# Camera Flow

Request Permission

↓

Live Preview

↓

Countdown

↓

Capture

↓

Store Image

↓

Repeat

↓

Editor

---

# Capture Flow

Current Photo

↓

Take Screenshot

↓

Save

↓

Increase Index

↓

Finished?

↓

No

↓

Next Countdown

↓

Yes

↓

Editor

---

# Editor Flow

Load Photos

↓

Load Frame

↓

Drag

↓

Zoom

↓

Preview

↓

Export

---

# Download Flow

Merge

↓

Render Canvas

↓

Generate PNG

↓

Download

---

# Frame System

Semua frame menggunakan ukuran yang sama.

MVP menggunakan satu layout.

Perbedaan hanya visual.

Frame disimpan di:

public/frames

---

# Frame Metadata

Setiap frame memiliki metadata.

Contoh

id

name

thumbnail

frameImage

photoCount

slotPosition

---

# Browser APIs

MediaDevices API

Mengakses kamera.

Canvas API

Rendering.

File API

Download.

---

# Rendering Strategy

Landing

Server Component

Camera

Client Component

Editor

Client Component

Download

Client Component

---

# Performance Strategy

Lazy Load

Dynamic Import

Image Optimization

Minimal Re-render

Memoization

---

# Error Handling

Camera Permission Denied

Camera Not Found

Capture Failed

Download Failed

Unsupported Browser

---

# Browser Support

Chrome

Edge

Safari

Firefox

Latest Version

---

# Security

Tidak menyimpan foto ke server.

Semua proses dilakukan di browser.

Tidak menggunakan backend.

Tidak mengumpulkan data pengguna.

---

# Scalability

Future Modules

Sticker

Text

Filter

QR Code

Dashboard

Authentication

Cloud Storage

Premium Frame

---

# Coding Principles

Feature First

Reusable Components

No Duplicate Logic

No Hardcoded Values

Single Responsibility Principle

Composition Over Inheritance

---

# Import Convention

Gunakan alias.

@

Contoh

@/components

@/features

@/hooks

@/store

---

# File Naming

Component

PascalCase

Hook

camelCase

Folder

kebab-case

Constants

UPPER_CASE

---

# State Principles

Global state hanya untuk data yang dipakai lintas feature.

State lokal menggunakan useState.

Derived state jangan disimpan.

---

# Architecture Goals

- Mudah dipelihara
- Mudah dikembangkan
- Reusable
- Scalable
- Modular
- High Performance
- Beginner Friendly

---

# Future Architecture

Saat project berkembang,

backend dapat ditambahkan menggunakan:

Laravel

atau

Supabase

tanpa mengubah struktur frontend secara signifikan.