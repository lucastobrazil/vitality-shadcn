# Architecture

**Analysis Date:** 2026-03-04

## Pattern Overview

**Overall:** Dual-Framework Component Registry with Documentation Site

This project is a **self-hosted shadcn/ui component registry** ("Vitality" theme) that serves two purposes:
1. A **Next.js documentation site** that showcases components with live previews, MDX docs, and install commands
2. A **component registry** distributable via `npx shadcn@latest add` for both React and Angular

**Key Characteristics:**
- Static site generation (SSG) via `next build` with `output: "export"` -- no server runtime
- Components exist in `registry/` (React) and `registry-ng/` (Angular) as distributable source files
- The docs site consumes registry components directly via path aliases (`@/registry/vitality/ui/*`)
- MDX content drives per-component documentation pages at build time
- Angular components have a parallel Storybook documentation site

## Layers

**Registry Layer (React):**
- Purpose: Distributable React UI components styled with the Vitality theme
- Location: `registry/vitality/`
- Contains: UI components (`ui/`), blocks (`blocks/`), hooks (`hooks/`), shared utilities (`lib/`)
- Depends on: radix-ui, class-variance-authority, lucide-react, tailwind-merge, clsx
- Used by: Documentation site pages, end-users who install via shadcn CLI

**Registry Layer (Angular):**
- Purpose: Distributable Angular UI components mirroring the React Vitality design
- Location: `registry-ng/vitality/`
- Contains: UI components (`ui/`), shared utilities (`lib/`), Storybook config (`.storybook/`)
- Depends on: Angular 21, Angular CDK, class-variance-authority, clsx, tailwind-merge
- Used by: Storybook documentation, end-users via shadcn-ng CLI

**Documentation Site Layer:**
- Purpose: Next.js App Router documentation site showcasing all registry components
- Location: `src/app/`
- Contains: Pages, layout, MDX content, demo files, site-level components
- Depends on: Registry layer components, next-mdx-remote, rehype-pretty-code, shiki
- Used by: Developers browsing the component library

**Content Layer:**
- Purpose: MDX documentation files with frontmatter metadata for each component
- Location: `src/app/content/docs/`
- Contains: Per-component MDX files under `components/` and `blocks/`
- Depends on: Custom MDX components defined in `src/app/_components/mdx-components.tsx`
- Used by: Dynamic route pages at `/components/[slug]` and `/blocks/[slug]`

**Demo Layer:**
- Purpose: Live preview examples for each component, loaded dynamically on the docs site
- Location: `src/app/_demos/`
- Contains: One file or folder per component (e.g., `button/demo.tsx`, `button/size.tsx`)
- Depends on: Registry components directly
- Used by: `LivePreview` component via `next/dynamic` import

**Shared Utilities Layer:**
- Purpose: Common helpers used across the docs site
- Location: `src/lib/`
- Contains: `utils.ts` (cn helper), `registry.ts` (component metadata reader), `mdx.ts` (MDX compilation)
- Depends on: clsx, tailwind-merge, next-mdx-remote, rehype-pretty-code
- Used by: Pages, layout, site components

## Data Flow

**Component Documentation Page Render:**

1. `generateStaticParams()` in `src/app/components/[slug]/page.tsx` reads all MDX files from `src/app/content/docs/components/` via `getComponents()` in `src/lib/registry.ts`
2. At build time, `compileMdxPage()` from `src/lib/mdx.ts` compiles the MDX source with custom components (code highlighting via shiki/rehype-pretty-code)
3. Custom MDX components like `<ComponentPreview>` resolve demo files from `src/app/_demos/` and render `<LivePreview>` (dynamic import) alongside `<ComponentSource>` (server-side source code reading + highlighting)
4. The page renders with frontmatter title/description, compiled MDX content, table of contents, and install command

**Registry Distribution Flow:**

1. `registry.json` at project root defines all distributable items (name, type, dependencies, files)
2. `npm run registry:build` runs `shadcn build` which reads `registry.json` and `components.json`, outputs JSON files to `public/r/`
3. `npm run registry:build:ng` runs `shadcn-ng build` for Angular components, outputs to `public/r/ng/`
4. End users install via `npx shadcn@latest add <registry-url>/r/<component>.json`

**Live Preview Flow:**

1. `<LivePreview slug="button/demo">` in `src/app/_components/live-preview.tsx` uses `next/dynamic` to import from `src/app/_demos/button/demo.tsx`
2. Demo files are "use client" components that import directly from `@/registry/vitality/ui/*`
3. The component renders in an isolated preview pane within `<ComponentPreviewTabs>`

**State Management:**
- No global state management library; the app is primarily static/read-only
- Theme state managed by `next-themes` via `<ThemeProvider>` in `src/app/providers.tsx`
- Sidebar open/close state managed by shadcn `SidebarProvider` context
- Command bar (Cmd+K) state is local component state in `src/app/_components/command-bar.tsx`

## Key Abstractions

**DemoMeta:**
- Purpose: Metadata object representing a component in the registry for sidebar/search/page rendering
- Definition: `src/lib/registry.ts` (type `DemoMeta`)
- Fields: `slug`, `name`, `description`, `registryName`, `source` ("shadcn" | "shadcn-customised" | "vitality"), `hasDemo`
- Pattern: Derived at build time by reading MDX frontmatter from `src/app/content/docs/`

**MDX Component System:**
- Purpose: Custom component map that MDX content can use in documentation pages
- Definition: `src/app/_components/mdx-components.tsx` (exported as `mdxComponents`)
- Key components: `ComponentPreview`, `ComponentSource`, `CodeTabs`, `Steps`, `Callout`
- Pattern: Passed to `compileMDX()` to enable rich interactive documentation

**CVA Variant Pattern (React):**
- Purpose: Type-safe component variant definitions using class-variance-authority
- Examples: `registry/vitality/ui/button.tsx`, `registry/vitality/ui/badge.tsx`
- Pattern: Define `const xxxVariants = cva(baseClasses, { variants: {...} })`, export both the component function and the variants object

**Angular Component Pattern:**
- Purpose: Parallel Angular implementations of Vitality components
- Examples: `registry-ng/vitality/ui/button/button.component.ts`, `registry-ng/vitality/ui/button/button.variants.ts`
- Pattern: Separate `.variants.ts` file (shared CVA definitions with `z`-prefixed variant names), `.component.ts` file (Angular component with signal-based inputs), `.stories.ts` (Storybook), optional `index.ts` barrel

## Entry Points

**Next.js App:**
- Location: `src/app/layout.tsx`
- Triggers: Next.js build/dev server
- Responsibilities: Root layout with ThemeProvider, SidebarProvider, SiteHeader, AppSidebar, CommandBar

**Home Page (Getting Started):**
- Location: `src/app/page.tsx`
- Triggers: Route `/`
- Responsibilities: Renders `src/app/content/docs/getting-started.mdx` as compiled MDX

**Component Pages:**
- Location: `src/app/components/[slug]/page.tsx`
- Triggers: Route `/components/:slug`
- Responsibilities: Static generation of all component doc pages from MDX content with live previews

**Block Pages:**
- Location: `src/app/blocks/[slug]/page.tsx`
- Triggers: Route `/blocks/:slug`
- Responsibilities: Static generation of block doc pages (same pattern as components)

**Storybook (Angular):**
- Location: `registry-ng/.storybook/main.ts`
- Triggers: `npm run storybook` (dev), `npm run storybook:build` (production)
- Responsibilities: Angular component showcase via Storybook at `/storybook` path

**Registry Build:**
- Location: `registry.json` + `components.json`
- Triggers: `npm run registry:build` (React), `npm run registry:build:ng` (Angular)
- Responsibilities: Generates distributable JSON registry files in `public/r/`

## Error Handling

**Strategy:** Graceful degradation with fallback UI

**Patterns:**
- Component pages call `notFound()` from `next/navigation` when a slug has no matching MDX or metadata (`src/app/components/[slug]/page.tsx`)
- `ComponentSource` renders informational fallback divs when source files are missing or paths are invalid (`src/app/_components/component-source.tsx`)
- Path traversal prevention: `mdxPath()` in `src/lib/mdx.ts` and `ComponentSource` both validate resolved paths start within the project root
- `LivePreview` shows a loading placeholder while dynamic imports resolve (`src/app/_components/live-preview.tsx`)

## Cross-Cutting Concerns

**Theming:** CSS custom properties defined in `src/app/globals.css` with light/dark variants. Controlled by `next-themes` ThemeProvider with `attribute="class"`. The Vitality theme extends standard shadcn colors with `--brand`, `--success`, `--warning`, `--info`, `--magentus-violet`.

**Styling:** Tailwind CSS v4 with PostCSS. All components use the `cn()` utility from `src/lib/utils.ts` (and `registry-ng/vitality/lib/utils.ts` for Angular). Variant styles defined via `class-variance-authority`.

**Code Highlighting:** Shiki-based syntax highlighting via `rehype-pretty-code` for MDX code blocks, and a custom `highlight()` function in `src/app/_components/shiki.ts` for component source display.

**Path Aliases:**
- React/Next.js: `@/*` maps to `./src/*`, `@/registry/*` maps to `./registry/*` (defined in `tsconfig.json`)
- Angular/Storybook: `@/lib/*` maps to `vitality/lib/*`, `@/ui/*` maps to `vitality/ui/*` (defined in `registry-ng/.storybook/tsconfig.json`)

**Deployment:** Static export to GitHub Pages via `.github/workflows/deploy.yml`. Build pipeline: registry build (React + Angular) -> Next.js build -> Storybook build -> copy Storybook to `out/storybook` -> deploy `out/` directory.

---

*Architecture analysis: 2026-03-04*
