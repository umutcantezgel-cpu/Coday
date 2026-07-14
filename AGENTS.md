# Coday Agency — Agent Context

## Project Identity

This is the website codebase for **Coday**, a solo headless web agency based in
Wetzlar, Germany. Owner: Umutcan Emre Tezgel.

Live domain: https://codayweb.de
Stack: Next.js 15 App Router, React 19, TypeScript (strict), TailwindCSS 4,
Sanity v3 (CMS), Supabase (Auth + DB), Vercel (hosting + Edge).

## Hard Rules

1. **NEVER modify these without explicit confirmation:**
   - `next.config.ts` (security headers, redirects)
   - `middleware.ts` (auth, CSP)
   - `.env.*` files (secrets)
   - `package.json` dependencies (lockfile drift risk)

2. **NEVER run destructive commands without explicit user approval:**
   - `rm -rf`
   - `git push --force`
   - `npm install <new-package>` (must be discussed first)
   - Database migrations against production

3. **Solo-Founder Reality:** This is a one-person agency. No team scripts.
   No multi-developer assumptions. Keep solutions maintainable by a single
   developer reading the code 6 months later.

## Style Guide

- TypeScript strict mode, no `any`
- React Server Components by default, Client Components only when needed
- Tailwind classes inline (no CSS modules unless absolutely needed)
- File naming: `kebab-case.tsx` for components, `camelCase.ts` for utils
- Tests in `__tests__/` next to source, never separate `/tests/` folder

## Architecture Conventions

- Routes in `app/[locale]/...` with next-intl
- Components in `components/`, organized by feature
- Sanity schemas in `sanity/schemaTypes/`
- Server Actions in `app/actions/*.ts` (use `"use server"` directive)
- Supabase client: SSR-version from `@supabase/ssr`, never `@supabase/supabase-js` directly

## Performance Budgets (Hard Limits)

- LCP P75 mobile: < 2.0 s
- INP P75: < 150 ms
- CLS P75: < 0.05
- First Load JS per route: < 100 KB
- Total JS shipped: < 250 KB

If a change would push these over budget, STOP and discuss with user first.

## Forbidden Patterns

- ❌ `localStorage` / `sessionStorage` for sensitive data
- ❌ Inline `<style>` or `<script>` without nonce
- ❌ Direct database access from Client Components
- ❌ Hardcoded API keys (env vars only)
- ❌ Fake testimonials / placeholder team members (legal risk: UWG § 5)

## Trust-Sensitive Content Rules

Coday is a solo agency. The website MUST NOT show:

- Fictional team members
- Unverifiable client logos
- Placeholder testimonials
- Claims of partnerships (Vercel/Google) without verifiable proof

Real references only: Batherm, MS Schlüsseldienst Wetzlar, Lindener Ratsstuben.

## Verification Before Closing a Task

After any change, verify in this order:

1. `npm run typecheck` — exits with code 0
2. `npm run lint` — exits with code 0
3. `npm run build` — completes successfully
4. Visual check on dev server: `npm run dev` and open changed routes
5. Lighthouse mobile audit if change touches Hero or main routes

If any check fails, do NOT mark task as complete. Report the failure to user
with the exact command output.

## Commit Messages

Format: `type(scope): subject` (Conventional Commits)

Types: feat, fix, chore, docs, refactor, perf, test, build, ci
Examples:

- `feat(seo): add JSON-LD Organization schema`
- `chore(deps): remove unused react-router-dom`
- `perf(hero): optimize LCP via priority image`

## Context for AI

This agent works alongside other AI tools (Claude, Perplexity, Gemini). The
human owner orchestrates them. Position is "AI-augmented craftsmanship" —
human dirigiert, KI führt aus.
