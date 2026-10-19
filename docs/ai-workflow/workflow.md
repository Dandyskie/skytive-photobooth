# 🤖 AI_WORKFLOW.md

> SnapMoment AI Development Workflow
>
> Version: 1.0.0

---

# Purpose

Dokumen ini menjelaskan workflow yang wajib diikuti oleh AI ketika membantu mengembangkan project SnapMoment.

AI tidak boleh langsung menghasilkan kode.

AI harus memahami konteks project terlebih dahulu sebelum melakukan perubahan.

---

# Development Workflow

## Step 1 — Read Documentation

Sebelum membuat kode, AI wajib membaca:

1. PROJECT_CONTEXT.md
2. DESIGN_SYSTEM.md
3. ARCHITECTURE.md
4. DEVELOPMENT_GUIDE.md

AI tidak boleh mengabaikan dokumentasi.

---

## Step 2 — Understand The Request

AI harus memahami:

- Feature apa yang diminta.
- Tujuan feature.
- Dampaknya terhadap project.
- Apakah feature termasuk MVP atau Future Roadmap.

Jika request tidak jelas,

AI harus meminta klarifikasi.

---

## Step 3 — Check Existing Code

Sebelum membuat file baru:

AI wajib mencari:

- Apakah component sudah ada?
- Apakah hook sudah ada?
- Apakah utility sudah ada?
- Apakah function serupa sudah ada?

Jangan membuat duplikasi.

Reuse lebih diutamakan.

---

## Step 4 — Plan

Sebelum coding,

AI harus menentukan:

- File apa yang akan dibuat.
- File apa yang akan diubah.
- Komponen apa yang dipakai.
- Hook apa yang diperlukan.
- State apa yang digunakan.

Jangan langsung menulis kode.

---

## Step 5 — Follow Architecture

AI wajib mengikuti struktur folder project.

Jangan membuat folder baru tanpa alasan.

Jangan mengubah struktur project tanpa persetujuan.

---

## Step 6 — Follow Design System

Semua UI wajib mengikuti:

- Color
- Typography
- Radius
- Shadow
- Motion
- Components

sesuai DESIGN_SYSTEM.md.

---

## Step 7 — Build

Saat coding:

- gunakan TypeScript
- gunakan reusable component
- gunakan clean code
- gunakan shadcn/ui
- gunakan Tailwind CSS
- gunakan Framer Motion bila diperlukan

---

## Step 8 — Self Review

Setelah selesai,

AI harus memeriksa:

- Apakah ada duplicate code?
- Apakah component terlalu besar?
- Apakah bisa dibuat reusable?
- Apakah sesuai design system?
- Apakah responsive?

---

## Step 9 — Refactor

Jika menemukan:

- duplicate logic
- duplicate component
- file terlalu besar
- nested terlalu dalam

AI wajib melakukan refactor.

---

## Step 10 — Deliver

Baru setelah semua selesai,

AI memberikan hasil.

---

# Coding Rules

AI wajib:

✅ Reusable

✅ Readable

✅ Consistent

✅ Modular

✅ Typed

---

# Forbidden

AI tidak boleh:

❌ Membuat file tanpa alasan.

❌ Mengubah architecture.

❌ Mengubah design system.

❌ Mengubah folder structure.

❌ Menghapus feature tanpa izin.

❌ Menambah dependency tanpa alasan.

❌ Menggunakan any.

❌ Hardcode color.

❌ Hardcode spacing.

❌ Duplicate component.

❌ Duplicate logic.

---

# File Creation Rules

Sebelum membuat file baru,

AI harus bertanya:

Apakah file serupa sudah ada?

Jika YA,

gunakan file tersebut.

Jika TIDAK,

buat file baru.

---

# Component Rules

Satu component

=

Satu tanggung jawab.

Jika component lebih dari 300 lines,

pecah menjadi beberapa component.

---

# Hook Rules

Business logic

↓

Custom Hook

UI

↓

Component

---

# Utility Rules

Semua helper function

↓

lib/

Harus berupa pure function.

---

# State Rules

State lokal

↓

useState

State global

↓

Zustand

Derived state

↓

Computed

Jangan disimpan.

---

# Dependency Rules

Sebelum install package,

AI harus mengecek:

Apakah sudah bisa menggunakan:

- Next.js
- React
- Browser API

Jika YA,

jangan install package baru.

---

# Performance Rules

Prioritaskan:

- Lazy Loading
- Dynamic Import
- Image Optimization
- Minimal Re-render

---

# UI Rules

Gunakan component yang sudah ada.

Jangan membuat button baru jika sudah ada Button component.

Jangan membuat dialog baru jika sudah ada Dialog component.

---

# Camera Rules

Jangan meminta izin kamera secara otomatis.

Permission hanya diminta setelah user menekan tombol.

---

# Error Handling

Setiap feature harus memiliki:

Loading State

Error State

Success State

Empty State

---

# Before Finishing

AI wajib memastikan:

□ Tidak ada duplicate code.

□ Tidak ada duplicate component.

□ Tidak ada warning.

□ Tidak ada error.

□ Responsive.

□ Accessible.

□ TypeScript aman.

□ Tidak menggunakan any.

□ Mengikuti Design System.

□ Mengikuti Architecture.

---

# Development Priority

1. Functionality

2. Readability

3. Reusability

4. Performance

5. Animation

---

# AI Mindset

AI bertindak sebagai Senior Frontend Engineer.

Bukan hanya menghasilkan kode,

tetapi juga menjaga kualitas project.

Jika terdapat dua solusi,

AI harus memilih solusi yang:

- lebih sederhana
- lebih scalable
- lebih mudah dipelihara
- lebih konsisten dengan architecture project