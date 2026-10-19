import { FrameMetadata, PhotoSlotPosition } from "@/types";

export async function generateHighResPNG(
  frame: FrameMetadata,
  photos: string[],
  positions: Record<number, PhotoSlotPosition>
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = frame.width;
  canvas.height = frame.height;
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Could not create canvas context");

  // Fill background
  ctx.fillStyle = frame.backgroundColor || "#FFFFFF";
  ctx.fillRect(0, 0, frame.width, frame.height);

  // Helper to load image as HTMLImageElement
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      // Only set crossOrigin for remote URLs; setting it on data: URLs or relative paths causes errors in Safari/Chrome
      if (src.startsWith("http://") || src.startsWith("https://")) {
        img.crossOrigin = "anonymous";
      }
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error(`Gagal memuat gambar: ${src.substring(0, 40)}... ${e}`));
      img.src = src;
    });
  };

  // 1. Draw each photo into its respective slot
  for (let i = 0; i < frame.slots.length; i++) {
    const slot = frame.slots[i];
    const photoUrl = photos[i];
    if (!photoUrl) continue;

    const photoImg = await loadImage(photoUrl);
    const pos = positions[i] || { x: 0, y: 0, scale: 1 };

    ctx.save();
    ctx.beginPath();
    // Clip slot area
    if (slot.borderRadius) {
      const r = slot.borderRadius;
      ctx.moveTo(slot.x + r, slot.y);
      ctx.arcTo(slot.x + slot.width, slot.y, slot.x + slot.width, slot.y + slot.height, r);
      ctx.arcTo(slot.x + slot.width, slot.y + slot.height, slot.x, slot.y + slot.height, r);
      ctx.arcTo(slot.x, slot.y + slot.height, slot.x, slot.y, r);
      ctx.arcTo(slot.x, slot.y, slot.x + slot.width, slot.y, r);
    } else {
      ctx.rect(slot.x, slot.y, slot.width, slot.height);
    }
    ctx.closePath();
    ctx.clip();

    // Scale aspect ratio cover
    const scaleCover = Math.max(
      slot.width / photoImg.width,
      slot.height / photoImg.height
    );

    const baseWidth = photoImg.width * scaleCover;
    const baseHeight = photoImg.height * scaleCover;

    const finalWidth = baseWidth * pos.scale;
    const finalHeight = baseHeight * pos.scale;

    // Center offset + user drag offsets
    const centerX = slot.x + slot.width / 2 + pos.x;
    const centerY = slot.y + slot.height / 2 + pos.y;

    const drawX = centerX - finalWidth / 2;
    const drawY = centerY - finalHeight / 2;

    ctx.drawImage(photoImg, drawX, drawY, finalWidth, finalHeight);
    ctx.restore();
  }

  // 2. Draw Frame Overlay PNG on top (if present)
  if (frame.frameImage && frame.frameImage.trim() !== "" && frame.frameImage !== "none") {
    try {
      const frameOverlayImg = await loadImage(frame.frameImage);
      ctx.drawImage(frameOverlayImg, 0, 0, frame.width, frame.height);
    } catch (err) {
      console.error("Frame overlay load error:", err);
    }
  }

  const resultDataUrl = canvas.toDataURL("image/png");

  // Bebaskan buffer memori kanvas beresolusi tinggi (1414x2000 memakan ~11MB buffer) segera
  canvas.width = 0;
  canvas.height = 0;

  return resultDataUrl;
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
