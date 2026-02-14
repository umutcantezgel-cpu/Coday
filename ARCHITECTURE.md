# 🏛️ System Architecture

## Overview

Coday is built as a **Single Page Application (SPA)** using React and Vite. It emphasizes:

1.  **Performance:** Client-side routing, code-splitting, and optimized assets.
2.  **SEO:** Dynamic meta tag management and structured data (JSON-LD).
3.  **Maintainability:** Strict separation of concerns using Feature-Sliced Design principles.

## 📂 Directory Breakdown

### `src/features` (The "What")

Contains the core business value of the application. Each feature is a self-contained module.

- **Example:** `src/features/calculator` contains the logic, state, and UI for the price estimation tool. It does _not_ know about the page it lives on.

### `src/widgets` (The "Where")

Widgets assemble features and shared UI into larger blocks used in layouts.

- **Example:** `src/widgets/navigation` combines links, dropdown logic, and the `CardNav` UI.

### `src/pages` (The "When")

Pages are thin composition layers that map a route to a layout and widgets.

- **Example:** `src/pages/Services.tsx` simply renders the `MainLayout` and injects the `ServiceHero` and `ServiceGrid` widgets.

### `src/shared` (The "How")

The foundation. Dumb UI components, global hooks, and utility functions.

- **Rules:** Shared modules can ONLY import from other shared modules. They cannot import from features or widgets.

## 🎨 Design System

We use a **Headless UI + Tailwind** approach.

- **Tokens:** Colors, spacing, and typography are defined in `tailwind.config.js`.
- **Components:** Found in `src/shared/ui`. These are unstyled by default and styled via utility classes.

## 🌍 State Management

- **Local State:** `useState` for simple component logic.
- **URL State:** We prefer storing state in the URL (search params) where possible (e.g., active tabs, search queries) to make views shareable.
- **Global State:** Minimal global state is used, primarily for Theme and Language contexts.

## 🔄 Data Flow

1.  **User Interaction** (Click) -> **Handler** (Feature Layer)
2.  **Logic** (Calculation/Validation) -> **State Update**
3.  **UI Render** (Shared UI Layer) -> **User Feedback**

## 🛡️ Security

- **No Secrets in Client Code:** API keys requiring protection must be proxied through a backend (Supabase Edge Functions).
- **Sanitization:** All user inputs are sanitized before processing.
