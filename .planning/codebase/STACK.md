# Technology Stack

**Analysis Date:** 2026-03-04

## Languages

**Primary:**
- TypeScript ^5 - All source code across Next.js app (`src/`), React component registry (`registry/vitality/`), and Angular component registry (`registry-ng/vitality/`)
- TSX - React components in `registry/vitality/ui/*.tsx` and `src/app/` pages/components
- MDX - Documentation pages in `src/app/content/docs/`

**Secondary:**
- CSS - Tailwind CSS v4 with custom properties in `src/app/globals.css`
- YAML - GitHub Actions workflow in `.github/workflows/deploy.yml`

## Runtime

**Environment:**
- Node.js 20 (specified in `.github/workflows/deploy.yml`, local version 20.19.5)
- Browser (static export, client-side rendering for interactive components)

**Package Manager:**
- npm 10.8.2
- Lockfile: `package-lock.json` (present, 27634 lines)

## Frameworks

**Core:**
- Next.js 16.1.6 - Documentation site framework, statically exported (`output: "export"` in `next.config.ts`)
- React 19.2.3 - UI component library (React registry)
- React DOM 19.2.3 - DOM rendering
- Angular ^21.0.0 - Angular component registry (dev dependency, `registry-ng/`)

**UI Primitives:**
- Radix UI 1.4.3 - Accessible primitives for React components (accordion, dialog, dropdown, select, tabs, tooltip, etc.)
- @base-ui/react ^1.2.0 - Used for combobox component (`registry/vitality/ui/combobox.tsx`)
- @angular/cdk ^21.0.0 - Angular CDK for Angular component primitives

**Styling:**
- Tailwind CSS ^4 - Utility-first CSS (v4 with `@tailwindcss/postcss` plugin)
- class-variance-authority ^0.7.1 - Component variant management (button, badge, tabs, etc.)
- clsx ^2.1.1 - Conditional class composition
- tailwind-merge ^3.4.0 - Intelligent Tailwind class merging
- tw-animate-css ^1.4.0 - Animation utilities (dev dependency)

**Documentation/Content:**
- next-mdx-remote ^6.0.0 - MDX compilation for component documentation
- rehype-pretty-code ^0.14.1 - Syntax highlighting in MDX
- remark-gfm ^4.0.1 - GitHub Flavored Markdown support
- shiki ^3.22.0 / @shikijs/rehype ^3.23.0 - Code syntax highlighting engine

**Testing/Dev:**
- Storybook ^10.2.8 - Angular component visual testing (`@storybook/angular`)
- ESLint ^9 with `eslint-config-next` 16.1.6 - Linting
- shadcn ^3.8.4 - Registry build tooling (`shadcn build`)

**Build/Dev:**
- PostCSS ^8.5.6 with `@tailwindcss/postcss` - CSS processing
- TypeScript ^5 - Type checking
- tsconfig-paths-webpack-plugin ^4.2.0 - Path alias resolution for Storybook webpack

## Key Dependencies

**Critical (React Registry):**
- `radix-ui` ^1.4.3 - Foundation for most UI components; provides accessible primitives
- `class-variance-authority` ^0.7.1 - All variant-based components use CVA for variant definitions
- `lucide-react` ^0.563.0 - Icon library used throughout React components
- `react-hook-form` ^7.71.1 - Form management (`registry/vitality/ui/form.tsx`)
- `@hookform/resolvers` ^5.2.2 - Form validation resolvers
- `zod` ^4.3.6 - Schema validation (used with form resolvers)

**Critical (Angular Registry):**
- `@angular/core` ^21.0.0 - Angular component framework
- `@angular/cdk` ^21.0.0 - Angular CDK for overlay, accessibility
- `lucide-angular` ^0.564.0 - Icon library for Angular components
- `ngx-sonner` ^3.1.0 - Toast notifications for Angular
- `rxjs` ^7.8.2 - Reactive programming for Angular

**UI Widgets:**
- `embla-carousel-react` ^8.6.0 - Carousel component
- `embla-carousel-angular` ^21.0.0 - Angular carousel
- `react-day-picker` ^9.13.2 - Calendar/date picker
- `date-fns` ^4.1.0 - Date utilities
- `recharts` ^2.15.4 - Chart components
- `cmdk` ^1.1.1 - Command palette
- `sonner` ^2.0.7 - Toast notifications (React)
- `vaul` ^1.1.2 - Drawer component
- `input-otp` ^1.4.2 - OTP input component
- `react-resizable-panels` ^4.6.2 - Resizable panel layout
- `next-themes` ^0.4.6 - Dark/light theme management

## Configuration

**Environment Variables:**
- `NEXT_PUBLIC_BASE_PATH` - Base URL path for deployment (defaults to `""`)
- `NEXT_PUBLIC_REGISTRY_URL` - Registry URL for install commands (defaults to `"https://vitality-shad.vercel.app"`)

**TypeScript:**
- Config: `tsconfig.json`
- Target: ES2017, Module: ESNext, JSX: react-jsx
- Strict mode enabled
- Path aliases: `@/*` -> `./src/*`, `@/registry/*` -> `./registry/*`
- Excludes: `node_modules`, `registry-ng`

**Angular TypeScript (Storybook):**
- Config: `registry-ng/.storybook/tsconfig.json`
- Target: ES2022, Module: ES2022
- Path aliases: `@/lib/*` -> `vitality/lib/*`, `@/ui/*` -> `vitality/ui/*`

**shadcn:**
- Config: `components.json`
- Style: `vitality` (custom)
- RSC: true, TSX: true
- Icon library: lucide
- Aliases: components `@/components`, utils `@/lib/utils`, ui `@/registry/vitality/ui`, lib `@/lib`, hooks `@/hooks`

**Angular:**
- Config: `angular.json`
- Project: `registry-ng` (application type)
- Source root: `registry-ng/vitality`
- Storybook on port 6006

**Build:**
- `next.config.ts` - Static export (`output: "export"`), unoptimized images, configurable base path
- `postcss.config.mjs` - Tailwind CSS v4 PostCSS plugin
- `eslint.config.mjs` - Next.js core-web-vitals + TypeScript rules

## Platform Requirements

**Development:**
- Node.js 20+
- npm (uses `package-lock.json`)
- macOS/Linux (standard Next.js development)

**Production:**
- Static HTML/CSS/JS (no server required)
- Deployed to GitHub Pages via GitHub Actions
- Storybook built and copied into `out/storybook` alongside Next.js export

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Next.js development server |
| `npm run build` | Build Next.js static export |
| `npm run start` | Start Next.js production server |
| `npm run lint` | Run ESLint |
| `npm run registry:build` | Build React shadcn registry (`shadcn build`) |
| `npm run registry:build:ng` | Build Angular registry (`shadcn-ng build`) |
| `npm run registry:build:all` | Build both registries |
| `npm run storybook` | Start Angular Storybook (port 6006) |
| `npm run storybook:build` | Build Angular Storybook for production |

---

*Stack analysis: 2026-03-04*
