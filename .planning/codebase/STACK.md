# Technology Stack

**Analysis Date:** 2026-02-25

## Languages

**Primary:**
- TypeScript ^5 - Used throughout the entire codebase (React components, Angular components, configuration)

**Secondary:**
- CSS - Tailwind CSS v4 with custom design tokens via CSS custom properties (`src/app/globals.css`)

## Runtime

**Environment:**
- Node.js v20 (specified in CI via `actions/setup-node@v4` with `node-version: 20`; local is v20.19.5)

**Package Manager:**
- npm v10.8.2
- Lockfile: `package-lock.json` (present, committed)

## Frameworks

**Core:**
- Next.js 16.1.6 - Documentation site and React component registry; uses App Router with static export (`output: "export"`)
- React 19.2.3 - React component library (the "vitality" registry)
- Angular ^21.0.0 - Angular component library port (the "vitality-ng" registry in `registry-ng/`)

**Component Primitives (React):**
- Radix UI (via `radix-ui` ^1.4.3) - Headless UI primitives for accessibility
- class-variance-authority ^0.7.1 - Variant-based component styling (CVA pattern)
- cmdk ^1.1.1 - Command palette component
- Vaul ^1.1.2 - Drawer component
- Sonner ^2.0.7 - Toast notifications

**Component Primitives (Angular):**
- Angular CDK ^21.0.0 - Overlay, portal, accessibility primitives
- lucide-angular ^0.564.0 - Icon library for Angular components
- embla-carousel-angular ^21.0.0 - Carousel implementation
- ngx-sonner ^3.1.0 - Toast notifications for Angular

**Documentation/Preview:**
- Storybook ^10.2.8 (Angular) - Component documentation and visual testing for Angular registry
- Shiki ^3.22.0 - Server-side code syntax highlighting in the Next.js docs site

**Testing:**
- Not detected - No test framework configured (no jest.config, vitest.config, or test scripts in package.json)

**Build/Dev:**
- Next.js built-in (Turbopack) - React app build
- Angular CLI ~21.1.0 with `@angular-devkit/build-angular` ~21.1.0 - Angular build
- PostCSS ^8.5.6 with `@tailwindcss/postcss` ^4 - CSS processing
- ESLint ^9 with `eslint-config-next` 16.1.6 - Linting (Next.js/React only)
- shadcn CLI ^3.8.4 - Registry build tooling (`shadcn build`)

## Key Dependencies

**Critical:**
- `tailwindcss` ^4 - Design system foundation; Tailwind CSS v4 using CSS-first configuration (no `tailwind.config.js`)
- `tailwind-merge` ^3.4.0 - Smart class merging via `cn()` utility
- `clsx` ^2.1.1 - Conditional class composition via `cn()` utility
- `radix-ui` ^1.4.3 - Accessibility and behavior layer for all React UI components
- `class-variance-authority` ^0.7.1 - Variant system for component styling (used in both React and Angular registries)

**UI/Interaction (React):**
- `lucide-react` ^0.563.0 - Icon library
- `react-day-picker` ^9.13.2 - Calendar/date picker
- `date-fns` ^4.1.0 - Date utility library
- `embla-carousel-react` ^8.6.0 - Carousel
- `react-resizable-panels` ^4.6.2 - Resizable panel layouts
- `recharts` ^2.15.4 - Charting library
- `react-hook-form` ^7.71.1 - Form state management
- `@hookform/resolvers` ^5.2.2 - Form validation resolvers
- `zod` ^4.3.6 - Schema validation (for forms)
- `input-otp` ^1.4.2 - OTP input component
- `next-themes` ^0.4.6 - Dark/light theme switching

**Infrastructure (Angular):**
- `rxjs` ^7.8.2 - Reactive programming (Angular dependency)
- `zone.js` ~0.15.0 - Angular change detection
- `tslib` ^2.8.1 - TypeScript runtime helpers

**Build Tooling:**
- `tsconfig-paths-webpack-plugin` ^4.2.0 - Path alias resolution for Storybook webpack
- `postcss-loader` ^8.2.0 - PostCSS integration for Storybook webpack
- `@storybook/addon-styling-webpack` ^3.0.0 - Custom CSS rule injection for Storybook
- `@storybook/addon-docs` ^10.2.8 - Auto-generated component documentation
- `@storybook/addon-themes` ^10.2.8 - Theme switching in Storybook (light/dark)
- `tw-animate-css` ^1.4.0 - Tailwind CSS animation utilities

## Configuration

**Environment Variables:**
- `NEXT_PUBLIC_BASE_PATH` - Base path for GitHub Pages deployment (set during CI build)
- `NEXT_PUBLIC_REGISTRY_URL` - Full URL to the registry JSON files (used in install commands and Storybook)
- No `.env` files are committed (all env vars are set in CI or default to empty/Vercel URL)

**TypeScript (React/Next.js):**
- Config: `tsconfig.json` (root)
- Target: ES2017, Module: ESNext, ModuleResolution: bundler
- Path aliases: `@/*` -> `./src/*`, `@/registry/*` -> `./registry/*`
- Strict mode enabled
- Excludes `registry-ng/` directory

**TypeScript (Angular/Storybook):**
- Config: `registry-ng/.storybook/tsconfig.json`
- Target: ES2022, Module: ES2022, ModuleResolution: bundler
- Path aliases: `@/lib/*` -> `vitality/lib/*`, `@/ui/*` -> `vitality/ui/*`
- Strict mode enabled

**shadcn Configuration:**
- Config: `components.json`
- Style: "vitality" (custom style)
- RSC: true, TSX: true
- Icon library: lucide
- Aliases: `@/components`, `@/lib/utils`, `@/registry/vitality/ui`, `@/lib`, `@/hooks`

**PostCSS:**
- Config: `postcss.config.mjs`
- Plugin: `@tailwindcss/postcss` (Tailwind v4 PostCSS plugin)

**ESLint:**
- Config: `eslint.config.mjs`
- Extends: `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`

**Next.js:**
- Config: `next.config.ts`
- Output: `export` (static site generation)
- Base path: configured via `NEXT_PUBLIC_BASE_PATH` env var
- Images: unoptimized (required for static export)

**Angular:**
- Config: `angular.json`
- Single project: `registry-ng`
- Builder: `@angular-devkit/build-angular:browser`
- Styles loaded from: `./src/app/globals.css` (shared with Next.js)

**Storybook:**
- Config directory: `registry-ng/.storybook/`
- Main config: `registry-ng/.storybook/main.ts`
- Preview: `registry-ng/.storybook/preview.ts`
- Port: 6006
- Compodoc: disabled
- Stories pattern: `../vitality/ui/**/*.stories.ts`
- Custom webpack: TsconfigPathsPlugin + addon-styling-webpack with postcss-loader for Tailwind v4

## Platform Requirements

**Development:**
- Node.js 20.x
- npm (no yarn/pnpm)
- macOS or Linux (standard web tooling)

**Production:**
- GitHub Pages (static hosting)
- Static export from Next.js (`out/` directory)
- Storybook static build copied into `out/storybook/`

**Monorepo Note:**
- `packages/cli/` directory exists with a `dist/` and `node_modules/` but appears to be an empty/unused CLI scaffold (empty dist, no source files visible)

---

*Stack analysis: 2026-02-25*
