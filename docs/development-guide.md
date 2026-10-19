# 💻 DEVELOPMENT_GUIDE.md

> SnapMoment Development Guide
>
> Version: 1.0.0

---

# Development Philosophy

Saat mengembangkan SnapMoment, selalu prioritaskan:

- Simplicity
- Readability
- Reusability
- Scalability
- Performance
- Consistency

Jangan membuat kode yang hanya bekerja.

Buat kode yang mudah dipahami dan mudah dikembangkan.

---

# Core Principles

✅ Reusable Components

✅ Clean Code

✅ Modular Architecture

✅ Feature First

✅ Single Responsibility Principle

✅ Performance First

---

# General Rules

Always

- Gunakan TypeScript.
- Gunakan App Router.
- Gunakan Functional Components.
- Gunakan Tailwind CSS.
- Gunakan shadcn/ui jika memungkinkan.

Never

- Inline CSS.
- Hardcoded color.
- Hardcoded spacing.
- Duplicate component.
- Duplicate logic.
- Anonymous component.

---

# Folder Rules

app/

Hanya routing.

Tidak boleh ada business logic.

---

components/

Reusable UI.

Tidak boleh mengakses global state.

---

features/

Business logic.

Semua feature memiliki folder sendiri.

---

hooks/

Reusable hook.

Harus diawali dengan use.

Contoh

useCamera

useCountdown

---

lib/

Utility function.

Pure function.

Tidak boleh mengubah state.

---

store/

Global state.

Gunakan Zustand.

---

constants/

Data statis.

---

types/

Semua interface dan type.

---

# Component Rules

Satu file hanya satu komponen utama.

Gunakan Props Interface.

Jangan membuat komponen terlalu besar.

Jika file sudah terlalu panjang,
pecah menjadi komponen baru.

---

# Component Naming

Good

Button

FrameCard

PhotoPreview

Countdown

SupportModal

Bad

Card2

NewButton

Component

---

# File Naming

PascalCase

Components

camelCase

Hooks

kebab-case

Folder

UPPER_CASE

Constants

---

# Import Rules

Gunakan alias.

Good

@/components

@/features

@/hooks

Bad

../../../components

---

# State Rules

Gunakan

useState

untuk state lokal.

Gunakan

Zustand

untuk state global.

Jangan menyimpan derived state.

---

# Props Rules

Gunakan interface.

Props harus memiliki nama yang jelas.

Hindari prop boolean yang ambigu.

Bad

active

Good

isSelected

---

# Tailwind Rules

Gunakan utility class.

Gunakan cn() untuk conditional class.

Hindari class yang terlalu panjang.

Jika class terlalu panjang,

buat reusable component.

---

# Styling Rules

Semua warna menggunakan design token.

Semua radius menggunakan design token.

Semua shadow mengikuti Design System.

Tidak boleh menggunakan warna random.

---

# Animation Rules

Gunakan Framer Motion.

Animation harus:

- Halus
- Ringan
- Memiliki tujuan

Jangan menambahkan animasi hanya karena terlihat keren.

---

# Camera Rules

Jangan meminta permission kamera sebelum user menekan tombol.

Selalu tampilkan loading.

Tangani permission denied.

Tangani kamera tidak tersedia.

---

# Capture Rules

Jumlah capture mengikuti jumlah slot frame.

Capture dilakukan otomatis.

User tidak perlu menekan tombol setiap foto.

---

# Editor Rules

Frame tidak dapat dipindahkan.

Foto dapat:

- Drag

- Zoom

Rotate bukan bagian MVP.

---

# Download Rules

Selalu export PNG.

Export dilakukan di browser.

Tidak ada upload ke server.

---

# Error Handling

Setiap feature wajib memiliki:

Loading State

Error State

Empty State

Success State

---

# Accessibility

Gunakan semantic HTML.

Selalu gunakan alt.

Button memiliki aria-label jika diperlukan.

Minimal touch target 44px.

---

# Performance Rules

Gunakan React.memo jika diperlukan.

Gunakan useMemo hanya jika benar-benar dibutuhkan.

Gunakan useCallback hanya untuk kasus tertentu.

Hindari re-render yang tidak perlu.

---

# Image Rules

Gunakan next/image untuk gambar biasa.

Frame PNG dapat menggunakan Image.

Optimalkan ukuran asset.

---

# Git Convention

feat:

fix:

refactor:

style:

docs:

test:

chore:

Contoh

feat(camera): add auto capture

fix(editor): resolve drag issue

docs: update architecture

---

# Branch Convention

main

develop

feature/*

fix/*

---

# Commit Rules

Satu commit

Satu tujuan.

Jangan mencampur banyak perubahan.

---

# Code Style

Gunakan early return.

Kurangi nested if.

Pisahkan function yang panjang.

Gunakan nama variabel yang jelas.

---

# AI Development Rules

Saat AI menghasilkan kode:

- Jangan membuat file yang tidak diperlukan.
- Jangan menduplikasi komponen.
- Selalu gunakan struktur folder yang sudah ditentukan.
- Ikuti Design System.
- Ikuti Architecture.
- Prioritaskan reusable component.
- Hindari overengineering.
- Jangan menambahkan dependency tanpa alasan yang jelas.

---

# Before Creating New Component

Tanyakan:

Apakah komponen serupa sudah ada?

Jika ya,

gunakan kembali.

---

# Before Installing New Package

Pastikan:

Apakah Next.js sudah memiliki solusi bawaan?

Apakah React sudah cukup?

Apakah utility sendiri lebih sederhana?

Tambahkan package hanya jika benar-benar memberikan manfaat.

---

# Development Workflow

1.

Pahami feature.

↓

2.

Buat UI.

↓

3.

Implement business logic.

↓

4.

Testing.

↓

5.

Refactor.

↓

6.

Responsive.

↓

7.

Accessibility.

↓

8.

Performance.

↓

9.

Review.

↓

10.

Commit.

---

# MVP Rules

Selalu prioritaskan:

Working First

Perfect Later

Jangan menambahkan fitur di luar MVP.

Selesaikan fitur yang sedang dikerjakan sebelum memulai fitur baru.

---

# Definition of Done

Sebuah fitur dianggap selesai jika:

✅ UI sesuai Design System

✅ Responsive

✅ Tidak ada error

✅ Tidak ada warning

✅ Accessible

✅ Performance baik

✅ Mudah dibaca

✅ Mudah dipelihara

✅ Sudah diuji secara manual

---

# Final Principle

SnapMoment dibangun untuk menjadi project portfolio berkualitas.

Setiap baris kode harus memiliki alasan.

Setiap komponen harus dapat digunakan kembali.

Setiap fitur harus sederhana, konsisten, dan menyenangkan untuk digunakan.

# File Size Rules

Tujuan:

Menjaga code tetap mudah dibaca, dirawat, dan dipisahkan berdasarkan tanggung jawab.

---

## Component File

Ideal

100 - 200 lines

Warning

200 - 300 lines

Required Refactor

> 300 lines

---

Jika sebuah component melebihi 300 baris:

- Pecah menjadi sub-component.
- Pindahkan business logic ke custom hook.
- Pindahkan utility ke folder lib.
- Pisahkan constants.
- Pisahkan types.

---

Contoh

Bad

CameraEditor.tsx

- UI
- Timer
- Camera
- Capture
- Drag
- Zoom
- Download

Semua dalam satu file.

1200 lines.

---

Good

features/

camera/

    CameraView.tsx

    CameraControls.tsx

    Countdown.tsx

    CaptureProgress.tsx

    useCamera.ts

    useCapture.ts

    camera.types.ts

---

## Hook File

Ideal

50 - 150 lines

Warning

150 - 250 lines

Refactor

> 250 lines

---

## Utility File

Ideal

20 - 100 lines

Refactor

> 150 lines

---

## Store File

Ideal

50 - 200 lines

Refactor

> 300 lines

---

## Page File

Ideal

50 - 150 lines

Warning

150 - 250 lines

Refactor

> 300 lines

Page sebaiknya hanya berisi:

- Layout
- Composition
- Data passing

Business logic dipindahkan ke feature.

---

# Refactor Trigger

Lakukan refactor jika:

- File lebih dari 300 lines.
- Terlalu banyak useState.
- Terlalu banyak props.
- Nested terlalu dalam.
- Sulit dipahami dalam 5 menit.
- Sulit dijelaskan ke developer lain.

---

# Principle

Satu file harus memiliki satu tanggung jawab utama.

Jika sebuah file terasa seperti melakukan banyak hal sekaligus,

pecah menjadi beberapa file yang lebih kecil.