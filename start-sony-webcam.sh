#!/bin/bash
echo "=== Menyiapkan Sony A6400 Webcam di Ubuntu ==="

# 1. Unmount SD card & lepas kunci otomatis kamera dari Ubuntu (GVFS)
echo "[1/3] Melepas mount otomatis & SD card kamera..."
umount /media/$USER/* 2>/dev/null
gio mount -u -s ptp 2>/dev/null
killall gvfs-gphoto2-volume-monitor gvfsd-gphoto2 2>/dev/null

# 2. Buat virtual webcam device
echo "[2/3] Membuka Virtual Webcam Device..."
sudo modprobe -r v4l2loopback 2>/dev/null
sudo modprobe v4l2loopback exclusive_caps=1 card_label="Sony A6400 Webcam"

# 3. Stream tampilan Sony ke Virtual Webcam
echo "[3/3] Streaming Kamera Berjalan! Buka browser dan pilih kamera 'Sony A6400 Webcam'."
echo "Tekan Ctrl+C untuk menghentikan streaming."

gphoto2 --stdout --capture-movie | ffmpeg -i - -vcodec rawvideo -pix_fmt yuv420p -f v4l2 /dev/video10
