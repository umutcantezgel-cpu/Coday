# Coday Digital Agency: Maintenance & Rollback Plan

## 1. Deployment Strategy

### Pre-Deployment

1. **Build Verification**: Run `npm run build` and ensure `dist` (or `build`) compiles without errors.
2. **Type Checking**: Verify `npx tsc --noEmit` exits with 0 (or known non-blocking warnings).
3. **Environment Secrets**: Ensure production environment is hydrated via CI/CD secrets manager, never hard-coded in the repository. Verify Sentry DSN and Supabase keys are active.

### Staging Verification

1. Deploy build artifact to staging environment (e.g. Vercel Preview, Netlify Branch Deploy).
2. Perform manual visual regression testing on high-value routes:
   - `/` (Home)
   - `/contact` (Lead Gen)
   - `/packages` (Pricing)
3. Test interactive components (e.g. ROI Estimator, Agency Comparison) for functionality.

## 2. Rollback Procedure

In the event of a catastrophic production failure (P0 incident):

1. **Identify the Last Known Good Build (LKGB)**: Locate the latest stable commit tag (e.g. `v1.2.0`).
2. **Execute Revert**:
   ```bash
   git revert HEAD
   git push origin main
   ```
   _Alternatively_, if using a modern hosting provider (Vercel/Netlify), click **Rollback** on the deployment dashboard to instantly revert the active immutable build.
3. **Post-Mortem**: Document the regression in Sentry/GitHub Issues.

## 3. Post-Deployment Monitoring

### 3.1 Error Tracking (Sentry)

- **Action**: Monitor Sentry for the first 24 hours post-deployment.
- **Threshold**: Zero tolerance for new fatal crashes. If errors exceed the baseline by >5%, initiate investigation.

### 3.2 Analytics & Engagement

- **GA4**: Verify traffic flow and conversion events on `/contact` and `/packages`.
- **User Feedback**: Monitor inbound lead quality and any user complaints regarding performance or broken layouts.

### 3.3 Core Web Vitals

- **Tool**: Google Search Console / Lighthouse CI.
- **Goal**: Maintain 90+ Lighthouse performance scores on desktop and optimal LCP/INP on mobile.

## 4. Routine Maintenance

- **Weekly**: Dependency audits (`npm audit`).
- **Monthly**: Review and update Framer Motion, React, and Tailwind to minor stable versions.
- **Quarterly**: Full UX/UI audit to verify alignment with latest design trends.
