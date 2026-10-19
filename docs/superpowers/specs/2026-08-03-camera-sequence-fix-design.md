# Camera Sequence Fix & Lifecycle Stabilization Design

## Goal Description
Fix the photobooth camera capture sequence in `CameraView.tsx` by isolating the camera mount lifecycle from state-driven re-renders. This ensures all 4 photos are captured automatically without being interrupted by React effect cleanup triggers.

## User Review & Decisions
- **Chosen Approach**: Approach 1 (Lifecycle Fix & Stable Ref-based Sequence Control).
- **Core Fix**: Remove re-render dependencies from `useEffect` cleanup hook so `isCancelledRef` and `stopCamera` are only executed when unmounting the component or when explicitly canceled by the user.

## Architecture & Component Changes

### `src/hooks/useCamera.ts`
- Ensure `startCamera` and `stopCamera` functions have stable identities or memoized references.
- Ensure `capturePhoto()` returns valid base64 PNG dataUrl reliably.

### `src/features/camera/CameraView.tsx`
- Stabilize `useEffect` lifecycle with empty dependency array `[]` or isolated mounting ref (`isMountedRef`).
- Separate sequence status control (`isSequenceActive`, `countdown`, `showFlash`) from MediaStream initialization.
- Execute clean 4-step sequence loop (`slot 0` to `slot 3`), storing photos directly and transitioning to `editor` step upon completion.

## Verification Plan
1. Run build verification (`npm run build`).
2. Test sequence completion (4 photos taken sequentially without stalling).
