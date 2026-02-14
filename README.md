# Coday | The Anti-Agency Agency Website

![License](https://img.shields.io/badge/license-Private-red.svg)
![Status](https://img.shields.io/badge/status-Production--Ready-success.svg)
![Stack](https://img.shields.io/badge/stack-React%20%7C%20Vite%20%7C%20TypeScript-blue.svg)

> **"We kill inefficiency."**
> A high-performance, design-driven corporate website built to dominate the digital agency market.

## ⚡ Tech Stack

This project leverages a modern, cutting-edge stack focused on performance, SEO, and developer experience.

- **Core:** [React 18](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4), PostCSS
- **Animation:** [Motion](https://motion.dev/) (Framer Motion)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Internationalization:** [i18next](https://www.i18next.com/) (en/de)
- **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)

## 🏗️ Project Structure

The project follows a **Feature-Sliced Design** inspired architecture to ensure scalability and maintainability.

```bash
src/
├── app/                # App-wide providers and entry points
├── features/           # Business logic and feature-specific components
│   ├── blog/           # Interactive blog components
│   ├── calculator/     # Pricing estimators
│   └── navigation/     # Complex navigation logic
├── pages/              # Route components (page-level composition)
├── shared/             # Reusable UI components and utilities
│   ├── ui/             # Atomic components (Buttons, Inputs, etc.)
│   └── lib/            # Helper functions and hooks
├── widgets/            # Complex composed UI blocks (Footer, Layouts)
└── routes.ts           # Central routing configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### Development

Start the local development server:

```bash
npm run dev
# Server running at http://localhost:3000
```

### Production Build

Create a production-ready build:

```bash
npm run build
npm run preview
```

## 🌍 Localization

The project supports **English (en)** and **German (de)**.

- Translation files are located in `public/locales/{lang}/{namespace}.json`.
- The app automatically detects user language preference.

## 🤝 Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

Copyright © 2026 Coday. All rights reserved.
Private repository. Unauthorized copying or distribution is strictly prohibited.
