# Design Spec: System Workflow & Technical Documentation for Dyskie Creative Online Photobooth

## Goal Description
Create a comprehensive documentation file `docs/workflow-photobooth-online.md` detailing the complete end-to-end user and admin workflows for the Dyskie Creative Online Photobooth application. Include architectural rationale, tech stack usage justifications, complete function explanations, and critical syntax code snippets.

## Documentation Structure
1. **System & Tech Stack Overview**: Next.js 15, TypeScript, Tailwind CSS v4, Zustand, HTML5 Canvas API, MediaDevices API with detailed justifications.
2. **User Workflow**: Step-by-step user journey from Landing Page to Frame Selection, Camera & Auto-Capture, Photo Editor, and PNG Export.
3. **Admin & Maintenance Workflow**: Frame metadata configuration, transparent RGBA PNG asset guidelines, Python Pillow automation script.
4. **Key Functions & Syntax Snippets**: Detailed analysis of `useCamera.ts`, `CameraView.tsx` Async Loop, `canvasExporter.ts` High-Res Renderer, and `usePhotoboothStore.ts`.

## Verification Plan
1. Ensure `docs/workflow-photobooth-online.md` is generated cleanly.
2. Validate markdown syntax formatting and accuracy against existing codebase.
