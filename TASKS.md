# RegulAIte UI/UX & Codebase Overhaul

This document outlines the roadmap for overhauling the RegulAIte project to feature a "Prism Glass aesthetic" and improve codebase quality, separated into structured phases.

## 1. START
- [x] **Project Setup:** Ensure backend (FastAPI) and frontend (Next.js) dependencies are updated and clearly separated.
- [x] **Codebase Audit:** Review `app.py` and backend logic for modularity. Identify bottlenecks and areas for separation of concerns.
- [x] **Design Inspiration:** Define the "Prism Glass aesthetic" (e.g., frosted glass, translucent backgrounds, clean typography, minimalist layout) as applied to a Next.js framework.
- [x] **Task Tracking Setup:** Initialize issue tracking or Kanban board.
- [x] **Requirements Verification:** Confirm requirements for Auth, Profile maintenance, Admin capabilities, and Text Demo Mode.

## 2. PLAN
- [x] **Frontend Architecture:** Migrate to React/Next.js for the desired UI/UX overhaul.
- [x] **UI/UX Design Mockups:** Incorporate the Prism Glass aesthetic (translucency, blur effects, gradients, soft shadows).
- [ ] **Backend Refactoring Plan:** Structure the FastAPI backend into routers, models, services, and core utilities.
- [ ] **API Design:** Document the REST API endpoints needed for the frontend.
- [x] **Auth & Users Plan:** Plan schemas/components for Login/Register, User Profile, and Admin Dashboard.

## 3. BUILD
- [ ] **Backend Overhaul:** Refactor the backend according to the plan (modularizing FastAPI).
- [x] **Frontend Foundation:** Setup the Next.js framework and inject foundational CSS for the Prism Glass look with Tailwind CSS.
- [ ] **Component Implementation:** Build/refactor individual components:
  - [x] Navigation/Sidebar
  - [x] Document Upload/Viewer
  - [x] Analysis/Results Dashboard
  - [x] Settings/Configuration
  - [x] Auth (Login/Register)
  - [x] Profile Maintenance
  - [x] Admin Capabilities
  - [x] Text Demo Mode (no credentials required)
- [ ] **Integration:** Connect the overhauled frontend to the refactored backend APIs.
- [x] **Styling & Polish:** Apply the final Prism Glass effects (CSS `backdrop-filter: blur()`, Framer Motion, animations).

## 4. VERIFY
- [ ] **Functionality Testing:** Ensure all document processing, LLM integrations (Google GenAI, Anthropic), and analysis pipelines work correctly.
- [ ] **UI/UX Review:** Validate that the interface matches the mockups and provides a cohesive Prism Glass aesthetic across different screen sizes.
- [ ] **Performance Testing:** Check for latency, especially with document uploads and AI processing.
- [x] **Code Quality Check:** Run linters, formatters, and ensure adequate test coverage. (Next.js optimizations, env vars).
- [ ] **User Acceptance Testing (UAT):** Gather feedback from end-users on the new design and workflow.
