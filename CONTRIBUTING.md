# Contributing to Coday

We welcome contributions to **Coday**. Please follow these guidelines to ensure the project remains high-quality, performant, and maintainable.

## 🛠 Development Standards

### "Green Build" Policy

We enforce a strict **Green Build** policy. A Pull Request cannot be merged if:

- ❌ Code does not compile (TypeScript errors).
- ❌ Linter reports errors (`npm run lint` fails).
- ❌ Tests fail (`npm run test` fails).

### Code Style

- **TypeScript**: Use strict typing. Avoid `any` unless absolutely necessary (and documented).
- **Tailwind**: Use utility classes over custom CSS. Use `index.css` only for global styles or complex animations.
- **Imports**: Organize imports:
  1. React/External Libs
  2. Absolute imports (`@/...`)
  3. Relative imports

## 🏗 Project Structure (FSD)

We use [Feature-Sliced Design](https://feature-sliced.design/).

- `src/app`: Providers, styles, global config.
- `src/pages`: Routing components.
- `src/widgets`: Compositional blocks (e.g., Header, Footer, Hero).
- `src/features`: User actions (e.g., Auth, ThemeSwitcher).
- `src/entities`: Business entities (e.g., User, Product).
- `src/shared`: Reusable primitives (Buttons, Inputs, API).

## 🚀 Workflow

1.  **Clone**: `git clone ...`
2.  **Install**: `npm install`
3.  **Dev**: `npm run dev`
4.  **Verify**: `npm run typecheck && npm run lint`

## 📦 Commits

Please use semantic commit messages:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting (no logic change)
- `refactor:` Code restructuring
- `chore:` Maintenance

Thank you for building with us!
