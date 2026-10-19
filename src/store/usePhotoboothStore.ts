import { create } from "zustand";
import {
  FrameMetadata,
  PhotoSlotPosition,
  PhotoboothFlow,
  PhotoboothStep,
  TimerOption,
} from "@/types";
import { DEFAULT_3STRIP_FRAME, NEWSPAPER_FRAME } from "@/constants/frames";

interface PhotoboothState {
  step: PhotoboothStep;
  flowType: PhotoboothFlow;
  selectedFrame: FrameMetadata;
  selectedTimer: TimerOption;
  photos: string[];
  photoPositions: Record<number, PhotoSlotPosition>;
  isCapturing: boolean;
  currentCaptureIndex: number;
  finalStripUrl: string | null;
  photoShareId: string | null;

  setStep: (step: PhotoboothStep) => void;
  setFlowType: (flowType: PhotoboothFlow) => void;
  startFlow: (flowType: PhotoboothFlow, targetFrame?: FrameMetadata) => void;
  setSelectedFrame: (frame: FrameMetadata) => void;
  setSelectedTimer: (timer: TimerOption) => void;
  addPhoto: (photoDataUrl: string) => void;
  setPhotos: (photos: string[]) => void;
  updatePhotoPosition: (index: number, position: Partial<PhotoSlotPosition>) => void;
  setIsCapturing: (isCapturing: boolean) => void;
  setCurrentCaptureIndex: (index: number) => void;
  setFinalStrip: (url: string, id: string) => void;
  resetPhotobooth: () => void;
}

const initialPositions: Record<number, PhotoSlotPosition> = {
  0: { x: 0, y: 0, scale: 1 },
  1: { x: 0, y: 0, scale: 1 },
  2: { x: 0, y: 0, scale: 1 },
  3: { x: 0, y: 0, scale: 1 },
};

export const usePhotoboothStore = create<PhotoboothState>((set) => ({
  step: "landing",
  flowType: "3-strip",
  selectedFrame: DEFAULT_3STRIP_FRAME,
  selectedTimer: 3,
  photos: [],
  photoPositions: initialPositions,
  isCapturing: false,
  currentCaptureIndex: 0,
  finalStripUrl: null,
  photoShareId: null,

  setStep: (step) => set({ step }),
  setFlowType: (flowType) =>
    set({
      flowType,
      selectedFrame:
        flowType === "newspaper" ? NEWSPAPER_FRAME : DEFAULT_3STRIP_FRAME,
    }),
  startFlow: (flowType, targetFrame) =>
    set({
      flowType,
      selectedFrame:
        targetFrame ||
        (flowType === "newspaper" ? NEWSPAPER_FRAME : DEFAULT_3STRIP_FRAME),
      step: flowType === "newspaper" ? "camera" : "frame-select",
      photos: [],
      photoPositions: initialPositions,
    }),
  setSelectedFrame: (selectedFrame) =>
    set({
      selectedFrame,
      flowType: selectedFrame.flowType || "3-strip",
    }),
  setSelectedTimer: (selectedTimer) => set({ selectedTimer }),
  addPhoto: (photoDataUrl) =>
    set((state) => ({ photos: [...state.photos, photoDataUrl] })),
  setPhotos: (photos) => set({ photos }),
  updatePhotoPosition: (index, position) =>
    set((state) => ({
      photoPositions: {
        ...state.photoPositions,
        [index]: {
          ...(state.photoPositions[index] || { x: 0, y: 0, scale: 1 }),
          ...position,
        },
      },
    })),
  setIsCapturing: (isCapturing) => set({ isCapturing }),
  setCurrentCaptureIndex: (currentCaptureIndex) => set({ currentCaptureIndex }),
  setFinalStrip: (finalStripUrl, photoShareId) =>
    set({ finalStripUrl, photoShareId }),
  resetPhotobooth: () =>
    set({
      step: "landing",
      photos: [],
      photoPositions: initialPositions,
      isCapturing: false,
      currentCaptureIndex: 0,
      finalStripUrl: null,
      photoShareId: null,
    }),
}));

