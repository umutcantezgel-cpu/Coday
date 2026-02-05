# Agency Domination – Deployment Manual
> Complete guide for deploying www.codayweb.de to production

---

## 📋 Pre-Deployment Checklist

Before deploying, verify:

- [ ] All environment variables are set (see Section 2)
- [ ] `npm run typecheck` passes
- [ ] `npm run build` completes without errors
- [ ] `npm audit` shows 0 vulnerabilities
- [ ] Legal pages have correct domain (www.codayweb.de)
- [ ] Steuernummer is in Impressum (039 874 00784)

---

## 1. Deployment Platform

### Recommended: Vercel (Preferred)

Vercel provides optimal performance for Vite/React applications with:
- Automatic HTTPS and edge network
- Serverless functions for API routes
- Preview deployments for PRs

### Alternative: Netlify

Compatible with the `public/_headers` file for security headers.

---

## 2. Environment Variables

Set these in your deployment platform's dashboard:

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key | ✅ |
| `RESEND_API_KEY` | Resend email API key (server-side) | ✅ |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key (optional) | ⚡ |
| `VITE_GEMINI_API_KEY` | Google Gemini API key (for Analyzer) | ⚡ |

### Where to get keys:

1. **Supabase**: https://supabase.com/dashboard → Project Settings → API
2. **Resend**: https://resend.com/api-keys
3. **Google Maps**: https://console.cloud.google.com/apis/credentials
4. **Gemini**: https://aistudio.google.com/apikey

---

## 3. Deploy to Vercel (Step-by-Step)

### Step 1: Connect Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select `umutcantezgel-cpu/Coday` (or your repo)
4. Click "Import"

### Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install --legacy-peer-deps` |

> ⚠️ **Important**: Use `--legacy-peer-deps` due to react-helmet-async peer dependency

### Step 3: Add Environment Variables

1. Click "Environment Variables" section
2. Add each variable from Section 2
3. Select environments: Production, Preview, Development

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Visit the generated URL to verify

### Step 5: Add Custom Domain

1. Go to Project Settings → Domains
2. Add `www.codayweb.de`
3. Add `codayweb.de` (redirect to www)
4. Update DNS records as shown:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

---

## 4. Deploy to Netlify (Alternative)

### Step 1: Connect Repository

1. Go to [app.netlify.com/start](https://app.netlify.com/start)
2. Connect GitHub and select repository
3. Configure build settings:

| Setting | Value |
|---------|-------|
| Build Command | `npm run build` |
| Publish Directory | `dist` |

### Step 2: Add Environment Variables

1. Site Settings → Environment variables
2. Add all variables from Section 2

### Step 3: Deploy

Build will start automatically. The `public/_headers` file will be applied for security headers.

### Step 4: Custom Domain

1. Domain settings → Add custom domain
2. Add `www.codayweb.de`
3. Configure DNS:

```
Type    Name    Value
A       @       75.2.60.5
CNAME   www     <your-site>.netlify.app
```

---

## 5. Security Headers Verification

After deployment, verify security headers are applied:

1. Visit https://securityheaders.com
2. Enter `https://www.codayweb.de`
3. Expected grade: **A** or **A+**

The `public/_headers` file configures:
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy` (CSP)
- `X-Frame-Options` (Clickjacking protection)
- `X-Content-Type-Options` (MIME sniffing protection)

---

## 6. Supabase Configuration

### Database Tables

Ensure these tables exist with RLS enabled:

1. **leads** – Contact form submissions
2. **analyses** – Website analyzer results
3. **bookings** – Appointment bookings

### Row Level Security (RLS)

Enable RLS on all tables and create appropriate policies:

```sql
-- Example: Allow public inserts to leads
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT TO anon
  WITH CHECK (true);
```

### Edge Functions

Deploy Supabase Edge Functions:

```bash
supabase functions deploy analyze-website
supabase functions deploy book-appointment
```

---

## 7. Post-Deployment Verification

### Functional Tests

- [ ] Homepage loads correctly
- [ ] Navigation works (all pages accessible)
- [ ] Contact form submits successfully
- [ ] Calculator functions properly
- [ ] Language switcher works (DE/EN)
- [ ] Legal pages display correct information
- [ ] Website Analyzer returns results

### Performance Tests

1. Run Lighthouse audit
2. Target scores:
   - Performance: > 90
   - Accessibility: > 95
   - Best Practices: > 90
   - SEO: > 95

### Security Verification

1. Check security headers (Section 5)
2. Verify HTTPS is enforced
3. Test form validation (try invalid inputs)

---

## 8. Common Issues & Solutions

### Build Fails: Peer Dependency Error

**Solution**: Add `--legacy-peer-deps` to install command

### 404 on Page Refresh

**Solution for Vercel**: Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Solution for Netlify**: Add `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables Not Working

- Ensure variables are prefixed with `VITE_` for client-side access
- Server-side only variables (like `RESEND_API_KEY`) don't need prefix

---

## 9. Monitoring & Maintenance

### Recommended Tools

1. **Vercel Analytics** – Built-in performance monitoring
2. **Sentry** – Error tracking (optional)
3. **Supabase Dashboard** – Database monitoring

### Regular Tasks

| Task | Frequency |
|------|-----------|
| Check `npm audit` | Weekly |
| Review error logs | Daily |
| Update dependencies | Monthly |
| Backup database | Weekly |

---

## 10. Rollback Procedure

If issues occur after deployment:

### Vercel
1. Go to Deployments tab
2. Find last working deployment
3. Click "..." → "Promote to Production"

### Netlify
1. Go to Deploys tab
2. Find last working deploy
3. Click "Publish deploy"

---

## 📞 Support

For deployment issues:
- **Email**: umut@codayweb.de
- **Website**: www.codayweb.de

---

*Last Updated: February 5, 2026*
*Version: 1.0.0*
