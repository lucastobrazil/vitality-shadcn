# Architecture

**Analysis Date:** 2026-02-25

## Pattern Overview

**Overall:** Dual-framework UI component registry with documentation site

This project is a self-hosted **shadcn/ui component registry** called "Vitality" that serves two parallel component libraries (React and Angular) through a Next.js documentation site. It follows the shadcn/ui registry pattern where components are source code distributed via JSON manifests, not published npm packages.

**Key Characteristics:**
- Components are source files meant to be copied into consumer projects via `npx shadcn@latest add`
- Two parallel registries: React (`registry/vitality/`) and Angular (`registry-ng/vitality/`)
- Next.js documentation site renders live demos, source code, and install commands
- Static site export (`output: "export"`) deployed to GitHub Pages
- Angular components have a separate Storybook documentation layer

## Layers

**Documentation Site (Next.js App Router):**
- Purpose: Serves as the component documentation and registry host
- Location: `src/app/`
- Contains: Pages, layout, demo previews, sidebar navigation, command palette
- Depends on: Registry components (React), shiki for syntax highlighting
- Used by: End users browsing components

**React Component Registry:**
- Purpose: Source-of-truth React UI components distributed via shadcn registry protocol
- Location: `registry/vitality/`
- Contains: UI components (`ui/`), blocks (`blocks/`), hooks (`hooks/`), utilities (`lib/`)
- Depends on: Radix UI primitives, class-variance-authority, tailwind-merge, lucide-react
- Used by: Documentation site (directly imported), consumers (via `npx shadcn add`)

**Angular Component Registry:**
- Purpose: Parallel Angular port of the component library (branded "zard-ui")
- Location: `registry-ng/vitality/`
- Contains: UI components (`ui/`), shared library code (`lib/`), Storybook config (`.storybook/`)
- Depends on: Angular CDK, lucide-angular, class-variance-authority, tailwind-merge
- Used by: Storybook documentation, consumers (via `shadcn-ng` CLI)

**Registry Build Output:**
- Purpose: JSON manifest files consumed by `npx shadcn add` and `shadcn-ng` CLIs
- Location: `public/r/` (React), `public/r/ng/` (Angular), `public/r/cli/components/` (Angular CLI)
- Contains: Generated JSON files with component source code, dependencies, and metadata
- Depends on: Built from `registry.json` (React) and `registry-ng/` source (Angular)
- Used by: Consumer projects installing components

**Shared Utilities:**
- Purpose: Common utility functions shared across both registries
- Location: `src/lib/utils.ts` (site), `registry/vitality/lib/utils.ts` (React registry), `registry-ng/vitality/lib/utils.ts` (Angular registry)
- Contains: `cn()` function (clsx + tailwind-merge), Angular-specific helpers
- Depends on: clsx, tailwind-merge
- Used by: All components in both registries

## Data Flow

**Component Installation (Consumer):**

1. Consumer runs `npx shadcn@latest add https://vitality-shad.vercel.app/r/button.json`
2. shadcn CLI fetches JSON manifest from `public/r/button.json`
3. JSON contains component source code, dependencies, and registry dependencies
4. CLI writes source files to consumer's project and installs npm dependencies

**Registry Build (Developer):**

1. Developer writes/modifies component in `registry/vitality/ui/` or `registry-ng/vitality/ui/`
2. `npm run registry:build` runs `shadcn build` using `registry.json` manifest
3. `npm run registry:build:ng` runs `shadcn-ng build` from `registry-ng/` directory
4. Both generate JSON files in `public/r/` directories
5. `npm run build` (Next.js) exports static site to `out/`

**Documentation Page Rendering:**

1. `src/app/registry.ts` defines metadata for all components (slug, name, description, registryName)
2. Dynamic routes `src/app/components/[slug]/page.tsx` and `src/app/blocks/[slug]/page.tsx` match slug to metadata
3. `generateStaticParams()` pre-renders all component pages at build time
4. `DemoPreview` component (`src/app/_components/demo-preview.tsx`) reads demo source from `src/app/_demos/{slug}.tsx` via `fs.readFileSync` at build time
5. Source code is syntax-highlighted via shiki on the server
6. Live preview is rendered client-side via `LivePreview` using `next/dynamic` lazy imports

**State Management:**
- No global state management library
- Theme state managed by `next-themes` (ThemeProvider in `src/app/providers.tsx`)
- Sidebar state managed by shadcn's `SidebarProvider` context
- Component filter state is local React state in `AppSidebar`
- Command palette state is local React state in `CommandBar`

## Key Abstractions

**DemoMeta:**
- Purpose: Metadata type for registry component documentation entries
- Defined in: `src/app/registry.ts`
- Pattern: Typed array of objects with `slug`, `name`, `description`, `registryName`, `isCustom`, `hasDemo`
- Used to: Drive sidebar navigation, page generation, demo rendering, and install commands

**CVA Variants (React):**
- Purpose: Type-safe variant system for component styling
- Examples: `registry/vitality/ui/button.tsx`, `registry/vitality/ui/badge.tsx`
- Pattern: `cva()` defines base styles + variant map, exported alongside component. Components accept `variant` and `size` props via `VariantProps<typeof xVariants>`.

**CVA Variants (Angular):**
- Purpose: Same variant system adapted for Angular signals
- Examples: `registry-ng/vitality/ui/button/button.variants.ts`, `registry-ng/vitality/ui/badge/badge.variants.ts`
- Pattern: Variants defined in separate `.variants.ts` file. Component uses `input()` signals for variant props prefixed with `z` (e.g., `zVariant`, `zSize`). Class string computed via `computed(() => cn(variants({...}), this.class()))`.

**Angular CDK Overlay Pattern:**
- Purpose: Imperative overlay/dialog creation for Angular components
- Examples: `registry-ng/vitality/ui/dialog/dialog.service.ts`, `registry-ng/vitality/ui/tooltip/tooltip.ts`
- Pattern: Injectable service creates CDK `OverlayRef`, attaches `ComponentPortal`, returns typed reference. Used for dialogs, tooltips, sheets, alert-dialogs.

**Live Preview System:**
- Purpose: Renders interactive component demos on documentation pages
- Location: `src/app/_components/live-preview.tsx`
- Pattern: Static map of slug-to-component using `next/dynamic()` lazy imports. Each demo file in `src/app/_demos/` is a default-exported React component.

## Entry Points

**Next.js App:**
- Location: `src/app/layout.tsx`
- Triggers: All page requests
- Responsibilities: Wraps app in ThemeProvider, SidebarProvider; renders AppSidebar, MobileHeader, CommandBar

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: `/` route
- Responsibilities: Renders "Getting Started" documentation with CSS theme code and install instructions

**Component Pages:**
- Location: `src/app/components/[slug]/page.tsx`
- Triggers: `/components/{slug}` routes
- Responsibilities: Looks up component metadata, renders DemoPreview with live demo, source code, and install command

**Block Pages:**
- Location: `src/app/blocks/[slug]/page.tsx`
- Triggers: `/blocks/{slug}` routes
- Responsibilities: Same pattern as component pages but for block-level components (header, side-nav)

**Registry JSON Endpoint:**
- Location: `public/r/{component-name}.json` (generated)
- Triggers: `npx shadcn add` CLI requests
- Responsibilities: Serves component source code and dependency metadata

**Storybook (Angular):**
- Location: `registry-ng/.storybook/main.ts`
- Triggers: `npm run storybook` / `ng run registry-ng:storybook`
- Responsibilities: Renders Angular component stories with Tailwind CSS processing

**CI/CD Pipeline:**
- Location: `.github/workflows/deploy.yml`
- Triggers: Push to `main` branch
- Responsibilities: Builds registries (React + Angular), Next.js site, Storybook; deploys everything to GitHub Pages under `out/`

## Error Handling

**Strategy:** Minimal -- this is a static documentation site with no API layer

**Patterns:**
- `notFound()` from `next/navigation` used in dynamic pages when slug doesn't match any component in registry metadata
- No try/catch blocks in component code; components are presentational
- Angular CDK overlay services guard against SSR with `isPlatformBrowser()` checks

## Cross-Cutting Concerns

**Styling:** Tailwind CSS v4 with CSS custom properties for theming. Both light and dark modes defined in `src/app/globals.css`. Class merging via `cn()` utility (clsx + tailwind-merge). Component variants managed via class-variance-authority (CVA).

**Theming:** `next-themes` ThemeProvider with class-based dark mode (`attribute="class"`). Angular Storybook uses `@storybook/addon-themes` with `withThemeByClassName`. CSS variables defined in `:root` and `.dark` selectors in `globals.css`.

**Path Aliases:** React uses `@/*` mapping to `./src/*` and `@/registry/*` mapping to `./registry/*` (defined in `tsconfig.json`). Angular uses `@/lib/*` mapping to `vitality/lib/*` and `@/ui/*` mapping to `vitality/ui/*` (defined in `registry-ng/.storybook/tsconfig.json`).

**Deployment:** Static export to GitHub Pages. `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_REGISTRY_URL` env vars configure paths for GitHub Pages subdirectory hosting. Storybook output is copied into `out/storybook/` alongside the Next.js export.

---

*Architecture analysis: 2026-02-25*
