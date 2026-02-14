# 👷 Contributing to Coday

We follow a strict set of guidelines to ensure code quality and consistency.

## 🛠️ Development Workflow

1.  **Branching:**
    - `main` is stable/production.
    - Create feature branches from `develop` (or `main` if `develop` doesn't match).
    - Format: `feature/feature-name` or `fix/bug-description`.

2.  **Commits:**
    - Use Conventional Commits.
    - `feat: add new calculator`
    - `fix: resolve mobile menu overlap`
    - `docs: update readme`
    - `style: fix padding on hero`
    - `refactor: optimize image loading`

3.  **Pull Requests:**
    - Keep PRs small and focused.
    - Add a description of what was changed and _why_.
    - Include screenshots for UI changes.

## 🎨 Code Style

- **Prettier:** Run `npx prettier --write .` before committing.
- **Imports:** Group imports:
  1.  React / Library imports
  2.  Features / Widgets
  3.  Shared / UI
  4.  Local styles / types
- **Files:** Use PascalCase for React components (`MyComponent.tsx`) and camelCase for utilities (`myUtility.ts`).

## 🧪 Testing

- **Manual Verification:** Always test your changes in both Desktop and Mobile viewports.
- **Localization:** Check that your changes work in both English and German. Do not hardcode text strings.

## 🚫 forbidden Patterns

- ❌ `console.log` in production code.
- ❌ Hardcoded secrets (API Keys).
- ❌ Inline styles (Use Tailwind classes).
- ❌ `any` type in TypeScript (unless absolutely necessary).
