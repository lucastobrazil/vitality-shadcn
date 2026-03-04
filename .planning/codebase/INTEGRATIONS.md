# External Integrations

**Analysis Date:** 2026-03-04

## APIs & External Services

**None.** This is a self-contained, statically-exported documentation site and component registry. There are no external API calls, no backend services, no database connections, and no third-party SaaS integrations in the application code.

## Data Storage

**Databases:**
- None. All data is file-system-based at build time.

**File Storage:**
- Local filesystem only
- Component source files read at build time from `registry/vitality/ui/*.tsx`
- MDX documentation files read at build time from `src/app/content/docs/`
- Demo components loaded from `src/app/_demos/`

**Caching:**
- None (static site, browser caching via standard HTTP headers)

## Authentication & Identity

**Auth Provider:**
- None. No authentication required. This is a public documentation site.

## Monitoring & Observability

**Error Tracking:**
- None

**Logs:**
- None (static site, no server-side logging)

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (static hosting)
- Also deployed to Vercel (referenced in `registry.json` homepage: `https://vitality-shad.vercel.app`)

**CI Pipeline:**
- GitHub Actions (`.github/workflows/deploy.yml`)
- Triggers: push to `main` branch, manual `workflow_dispatch`
- Runner: `ubuntu-latest`
- Build steps:
  1. Checkout code
  2. Setup Node 20 with npm cache
  3. Configure GitHub Pages
  4. `npm ci` - install dependencies
  5. `npm run registry:build` - build React shadcn registry
  6. `npm run registry:build:ng` - build Angular registry
  7. `npm run build` - build Next.js static export
  8. `npm run storybook:build` - build Angular Storybook
  9. Copy Storybook to `out/storybook`
  10. Upload artifact and deploy to GitHub Pages

**Concurrency:**
- Group: `pages`
- Cancel in-progress: false

**Permissions:**
- `contents: read`
- `pages: write`
- `id-token: write`

## Environment Configuration

**Required env vars:**
- None required for local development (all have defaults)

**Optional env vars:**
- `NEXT_PUBLIC_BASE_PATH` - Set by GitHub Actions from `actions/configure-pages` output. Defaults to `""`. Used in `next.config.ts` for `basePath` and in `src/app/_components/site-header.tsx` for Storybook link.
- `NEXT_PUBLIC_REGISTRY_URL` - Set by GitHub Actions. Defaults to `"https://vitality-shad.vercel.app"`. Used in `src/app/_components/install-command.tsx` to generate `npx shadcn add` commands, and in `registry-ng/.storybook/main.ts` via webpack DefinePlugin.

**Secrets location:**
- No secrets required. All env vars are public (NEXT_PUBLIC_ prefix).

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Registry Distribution

**React Registry:**
- Built by `shadcn build` from `registry.json`
- Components distributed as JSON files at `/r/{component-name}.json`
- Consumers install via: `npx shadcn@latest add https://vitality-shad.vercel.app/r/{name}.json`
- Registry schema: `https://ui.shadcn.com/schema/registry.json`

**Angular Registry:**
- Built by `shadcn-ng build` from `registry-ng/registry.json`
- Output to `public/r/ng/`
- Registry schema: `https://ui.adrianub.dev/schema/registry.json`

## Third-Party UI Libraries (Build-time Dependencies, Not Runtime Services)

These are npm packages, not external service integrations. Listed here for completeness:

**Radix UI** - Accessible React primitives
- Package: `radix-ui` ^1.4.3
- No API calls, no external network requests

**Shiki** - Syntax highlighting
- Package: `shiki` ^3.22.0
- All processing happens at build time via `src/app/_components/shiki.ts`
- Themes: `github-dark-default`, `github-light-default`

**Embla Carousel** - Carousel functionality
- Packages: `embla-carousel-react` ^8.6.0, `embla-carousel-angular` ^21.0.0
- Client-side only, no external calls

---

*Integration audit: 2026-03-04*
