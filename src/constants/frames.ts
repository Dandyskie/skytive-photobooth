import { FrameMetadata, TimerOption } from "@/types";

export const FRAMES: FrameMetadata[] = [
  // =========================================================================
  // 1. NEWSPAPER GAZETTE EDITION (FLOW 2 - 1 SHOT)
  // =========================================================================
  {
    id: "frame-newspaper-gazette",
    name: "The Skytive Gazette",
    flowType: "newspaper",
    thumbnail: "/frame-newspaper/Newspaper-Frame.png",
    frameImage: "/frame-newspaper/Newspaper-Frame.png",
    photoCount: 1,
    width: 1414,
    height: 2000,
    backgroundColor: "#EFECE6",
    accentColor: "#191919",
    category: "Newspaper",
    description: "Format 1414×2000 px poster koran editorial vintage dengan 1 foto headline utama.",
    slots: [
      { id: 0, x: 92, y: 600, width: 1225, height: 977, borderRadius: 0 },
    ],
  },

  // =========================================================================
  // 2. NEW 3-STRIP EDITORIAL COLLECTION (FLOW 1 - 3 SHOTS)
  // =========================================================================
  {
    id: "frame-elegant",
    name: "Elegant Minimalist",
    flowType: "3-strip",
    thumbnail: "/new-frame/Elegant-Frame.png",
    frameImage: "/new-frame/Elegant-Frame.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#F5F3EE",
    accentColor: "#191919",
    category: "3-Strip Studio",
    description: "Desain editorial kontemporer dengan garis elegan dan tipografi presisi.",
    slots: [
      { id: 0, x: 72, y: 178, width: 456, height: 388, borderRadius: 12 },
      { id: 1, x: 72, y: 682, width: 456, height: 388, borderRadius: 12 },
      { id: 2, x: 72, y: 1186, width: 456, height: 388, borderRadius: 12 },
    ],
  },
  {
    id: "frame-retro-vintage",
    name: "Retro Vintage Archive",
    flowType: "3-strip",
    thumbnail: "/new-frame/RetroVintage-Frame.png",
    frameImage: "/new-frame/RetroVintage-Frame.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#ECE5D8",
    accentColor: "#B83A24",
    category: "3-Strip Studio",
    description: "Nuansa strip klasik bernuansa warm sepia dan sentuhan film analog.",
    slots: [
      { id: 0, x: 72, y: 178, width: 456, height: 388, borderRadius: 12 },
      { id: 1, x: 72, y: 682, width: 456, height: 388, borderRadius: 12 },
      { id: 2, x: 72, y: 1186, width: 456, height: 388, borderRadius: 12 },
    ],
  },
  {
    id: "frame-bubble-cute",
    name: "Bubble Cute Studio",
    flowType: "3-strip",
    thumbnail: "/new-frame/BubbleCute-Frame.png",
    frameImage: "/new-frame/BubbleCute-Frame.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#FFF2F5",
    accentColor: "#E05A78",
    category: "3-Strip Studio",
    description: "Estetika bubble playful modern dengan palet warna lembut.",
    slots: [
      { id: 0, x: 72, y: 178, width: 456, height: 388, borderRadius: 12 },
      { id: 1, x: 72, y: 682, width: 456, height: 388, borderRadius: 12 },
      { id: 2, x: 72, y: 1186, width: 456, height: 388, borderRadius: 12 },
    ],
  },
  {
    id: "frame-dreamy-fun",
    name: "Dreamy Fun Palette",
    flowType: "3-strip",
    thumbnail: "/new-frame/DreamyFun-Frame.png",
    frameImage: "/new-frame/DreamyFun-Frame.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#F3E8FF",
    accentColor: "#9333EA",
    category: "3-Strip Studio",
    description: "Gradasi pastel dreamy yang artistik untuk momen berkesan.",
    slots: [
      { id: 0, x: 72, y: 178, width: 456, height: 388, borderRadius: 12 },
      { id: 1, x: 72, y: 682, width: 456, height: 388, borderRadius: 12 },
      { id: 2, x: 72, y: 1186, width: 456, height: 388, borderRadius: 12 },
    ],
  },
  {
    id: "frame-skena",
    name: "Skena Creative",
    flowType: "3-strip",
    thumbnail: "/new-frame/Skena-Frame.png",
    frameImage: "/new-frame/Skena-Frame.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#EBEBEB",
    accentColor: "#191919",
    category: "3-Strip Studio",
    description: "Grafis berani dan kontemporer dengan gaya street culture.",
    slots: [
      { id: 0, x: 72, y: 178, width: 456, height: 388, borderRadius: 12 },
      { id: 1, x: 72, y: 682, width: 456, height: 388, borderRadius: 12 },
      { id: 2, x: 72, y: 1186, width: 456, height: 388, borderRadius: 12 },
    ],
  },
  {
    id: "frame-street-racing",
    name: "Street Velocity",
    flowType: "3-strip",
    thumbnail: "/new-frame/StreetRacing-Frame.png",
    frameImage: "/new-frame/StreetRacing-Frame.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#1C1C1E",
    accentColor: "#F59E0B",
    category: "3-Strip Studio",
    description: "Gaya automotive racing editorial berenergi tinggi.",
    slots: [
      { id: 0, x: 72, y: 178, width: 456, height: 388, borderRadius: 12 },
      { id: 1, x: 72, y: 682, width: 456, height: 388, borderRadius: 12 },
      { id: 2, x: 72, y: 1186, width: 456, height: 388, borderRadius: 12 },
    ],
  },
  {
    id: "frame-noframe",
    name: "Contemporary Studio Strip (Polosan)",
    flowType: "3-strip",
    thumbnail: "/frames/frame-noframe.svg",
    frameImage: "",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#FFFFFF",
    accentColor: "#191919",
    category: "Minimal Studio",
    description: "Tampilan bersih murni dengan pilihan warna latar studio yang dapat disesuaikan.",
    slots: [
      { id: 0, x: 50, y: 100, width: 500, height: 440, borderRadius: 12 },
      { id: 1, x: 50, y: 580, width: 500, height: 440, borderRadius: 12 },
      { id: 2, x: 50, y: 1060, width: 500, height: 440, borderRadius: 12 },
    ],
  },

  // =========================================================================
  // 3. LEGACY RETRO FRAMES (DIPERTAHANKAN 100%)
  // =========================================================================
  {
    id: "frame-3slot-1",
    name: "Y2K Rosé Pink",
    flowType: "3-strip",
    thumbnail: "/frames/Frame3slot-1.png",
    frameImage: "/frames/Frame3slot-1.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#FFF0F5",
    accentColor: "#FF85A1",
    category: "Classic Archive",
    description: "Koleksi nostalgia Y2K edisi Rosé.",
    slots: [
      { id: 0, x: 60, y: 55, width: 480, height: 395, borderRadius: 16 },
      { id: 1, x: 60, y: 500, width: 480, height: 360, borderRadius: 16 },
      { id: 2, x: 60, y: 900, width: 480, height: 365, borderRadius: 16 },
    ],
  },
  {
    id: "frame-3slot-2",
    name: "Dreamy Lavender",
    flowType: "3-strip",
    thumbnail: "/frames/Frame3slot-2.png",
    frameImage: "/frames/Frame3slot-2.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#F3E8FF",
    accentColor: "#B892FF",
    category: "Classic Archive",
    description: "Koleksi lavender dreamy retro edition.",
    slots: [
      { id: 0, x: 65, y: 200, width: 470, height: 365, borderRadius: 16 },
      { id: 1, x: 65, y: 625, width: 470, height: 365, borderRadius: 16 },
      { id: 2, x: 65, y: 1050, width: 470, height: 365, borderRadius: 16 },
    ],
  },
  {
    id: "frame-3slot-3",
    name: "Cyber Sky Sparkle",
    flowType: "3-strip",
    thumbnail: "/frames/Frame3slot-3.png",
    frameImage: "/frames/Frame3slot-3.png",
    photoCount: 3,
    width: 600,
    height: 1800,
    backgroundColor: "#E0F2FE",
    accentColor: "#70D6FF",
    category: "Classic Archive",
    description: "Koleksi cyber sky sparkle retro edition.",
    slots: [
      { id: 0, x: 45, y: 145, width: 510, height: 490, borderRadius: 16 },
      { id: 1, x: 45, y: 700, width: 510, height: 315, borderRadius: 16 },
      { id: 2, x: 45, y: 1090, width: 510, height: 505, borderRadius: 16 },
    ],
  },
];

export const NEWSPAPER_FRAME: FrameMetadata = FRAMES[0];
export const DEFAULT_3STRIP_FRAME: FrameMetadata = FRAMES[1]; // Elegant Minimalist

export const TIMERS: TimerOption[] = [3, 5];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com",
};

