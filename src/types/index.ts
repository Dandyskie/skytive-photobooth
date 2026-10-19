export type PhotoboothFlow = "3-strip" | "newspaper";

export type PhotoboothStep =
  | "landing"
  | "frame-select"
  | "camera"
  | "editor"
  | "download";

export interface FrameSlot {
  id: number;
  x: number; // exact pixels relative to frame canvas
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
}

export interface FrameMetadata {
  id: string;
  name: string;
  flowType: PhotoboothFlow;
  thumbnail: string;
  frameImage: string;
  photoCount: number;
  slots: FrameSlot[];
  width: number;
  height: number;
  backgroundColor?: string;
  accentColor?: string;
  category?: string;
  description?: string;
}

export interface PhotoSlotPosition {
  x: number;
  y: number;
  scale: number;
}

export type TimerOption = 3 | 5;

export interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmDownload: () => void;
}

