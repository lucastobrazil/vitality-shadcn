# External Integrations

**Analysis Date:** 2026-02-25

## APIs & External Services

**shadcn Registry Protocol:**
- The project IS a self-hosted shadcn/ui component registry. It produces JSON files at `/public/r/*.json` consumed by `npx shadcn@latest add <url>`.
- React registry built via: `shadcn build` (reads `registry.json`)
- Angular registry built via: `npx shadcn-ng@latest build --cwd=registry-ng --output=../public/r/ng`
- Registry manifest (React): `registry.json`
- Registry manifest (Angular): `registry-ng/registry.json`
- Registry URL configured via `NEXT_PUBLIC_REGISTRY_URL` env var (defaults to `https://vitality-shad.vercel.app`)

**No external API calls at runtime.** This is a purely static documentation site with no backend, no fetch calls to third-party services, and no server-side API routes.

## Data Storage

**Databases:**
- None - Fully static site with no database

**File Storage:**
- Local filesystem only
- Component source code read from disk at build time via `fs.readFileSync()` in `src/app/_components/demo-preview.tsx` and `src/app/page.tsx`
- Static assets in `public/` (SVG logos, icons)
- Built registry JSON output in `public/r/`

**Caching:**
- None - Static site, all caching handled by browser/CDN

## Authentication & Identity

**Auth Provider:**
- None - Public documentation site with no authentication

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- None (static site)

**Analytics:**
- Not detected

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (static hosting)
- Deployment workflow: `.github/workflows/deploy.yml`
- Triggered on: push to `main` branch + manual `workflow_dispatch`

**CI Pipeline:**
- GitHub Actions
- Runner: `ubuntu-latest`
- Node version: 20 (with npm cache)
- Build steps:
  1. `npm ci` - Install dependencies
  2. `npm run registry:build` - Build React registry JSON files
  3. `npm run registry:build:ng` - Build Angular registry JSON files
  4. `npm run build` - Build Next.js static site (with `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_REGISTRY_URL`)
  5. `npm run storybook:build` - Build Storybook static site
  6. Copy `storybook-static/` into `out/storybook/`
  7. Upload `out/` as GitHub Pages artifact
  8. Deploy via `actions/deploy-pages@v4`

**Deployment Permissions:**
- `contents: read`
- `pages: write`
- `id-token: write`
- Concurrency group: `pages` (cancel-in-progress: false)

## Environment Configuration

**Required env vars (CI only):**
- `NEXT_PUBLIC_BASE_PATH` - Auto-set from `actions/configure-pages` output (`steps.pages.outputs.base_path`)
- `NEXT_PUBLIC_REGISTRY_URL` - Constructed from pages origin + base_path

**Optional env vars (development):**
- `NEXT_PUBLIC_BASE_PATH` - Defaults to `""` (empty string) when not set
- `NEXT_PUBLIC_REGISTRY_URL` - Defaults to `"https://vitality-shad.vercel.app"` when not set (see `src/app/_components/install-command.tsx`)

**Secrets location:**
- No secrets required - Entirely public, static site with no API keys

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Third-Party Library Integrations (Not APIs)

These are not external service integrations but notable in-process library integrations:

**Shiki (Syntax Highlighting):**
- Used server-side at build time for code highlighting
- Config: `src/app/_components/shiki.ts`
- Themes: `github-light`, `github-dark`
- Languages: `tsx`, `css`, `bash`
- Singleton highlighter pattern (created once, reused)

**Embla Carousel:**
- React: `embla-carousel-react` ^8.6.0 with autoplay and class names plugins
- Angular: `embla-carousel-angular` ^21.0.0 with `embla-carousel-autoplay`, `embla-carousel-class-names`, `embla-carousel-wheel-gestures`
- Plugin service: `registry-ng/vitality/ui/carousel/carousel-plugins.service.ts`

**Recharts:**
- Chart components in `registry/vitality/ui/chart.tsx`
- Used for data visualization demos

**Lucide Icons:**
- React: `lucide-react` ^0.563.0 - Direct icon imports
- Angular: `lucide-angular` ^0.564.0 - Wrapped in custom `ZardIconComponent` at `registry-ng/vitality/ui/icon/icon.component.ts`

---

*Integration audit: 2026-02-25*
