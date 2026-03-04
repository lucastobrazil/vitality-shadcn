# Codebase Structure

**Analysis Date:** 2026-03-04

## Directory Layout

```
vitality-shadcn/
├── .github/workflows/       # CI/CD (GitHub Pages deploy)
├── .planning/codebase/      # SAUCE analysis documents
├── public/                  # Static assets (SVGs, .nojekyll)
│   └── r/                   # Generated registry JSON (built, not committed)
├── registry/                # React component registry (distributable)
│   └── vitality/
│       ├── blocks/          # Block-level React components (header, side-nav)
│       ├── hooks/           # Distributable React hooks
│       ├── lib/             # Distributable shared utilities (utils.ts)
│       └── ui/              # All React UI components (one .tsx per component)
├── registry-ng/             # Angular component registry (distributable)
│   ├── .storybook/          # Storybook config (main.ts, preview.ts, tsconfig)
│   │   ├── docs/            # Storybook MDX docs
│   │   └── public/          # Storybook static assets
│   └── vitality/
│       ├── lib/             # Angular shared utilities (utils.ts, core.ts, directives)
│       └── ui/              # Angular UI components (one folder per component)
│           └── <component>/ # Contains .component.ts, .variants.ts, .stories.ts, index.ts
├── src/                     # Next.js documentation site source
│   ├── app/                 # Next.js App Router
│   │   ├── _components/     # Site-level components (sidebar, header, MDX renderers)
│   │   ├── _demos/          # Live preview demo files
│   │   │   └── <component>/ # Per-component demos (demo.tsx, variant.tsx, etc.)
│   │   ├── blocks/[slug]/   # Dynamic route: block documentation pages
│   │   ├── components/[slug]/ # Dynamic route: component documentation pages
│   │   └── content/docs/    # MDX documentation content
│   │       ├── blocks/      # Per-block MDX files
│   │       ├── components/  # Per-component MDX files
│   │       └── getting-started.mdx
│   ├── hooks/               # Site-level React hooks
│   └── lib/                 # Site-level utilities (registry reader, MDX compiler)
├── angular.json             # Angular workspace config (for Storybook)
├── components.json          # shadcn CLI config (vitality style)
├── next.config.ts           # Next.js config (static export)
├── registry.json            # shadcn registry manifest (all distributable items)
├── tsconfig.json            # TypeScript config (excludes registry-ng)
├── eslint.config.mjs        # ESLint config
├── postcss.config.mjs       # PostCSS config (Tailwind)
└── package.json             # Dependencies, scripts
```

## Directory Purposes

**`registry/vitality/ui/`:**
- Purpose: All distributable React UI components for the Vitality theme
- Contains: One `.tsx` file per component (e.g., `button.tsx`, `badge.tsx`, `dialog.tsx`)
- Key files: `button.tsx`, `sidebar.tsx`, `form.tsx`, `combobox.tsx`
- Pattern: Each file exports the component function(s) and optionally a CVA variants object

**`registry/vitality/blocks/`:**
- Purpose: Higher-level distributable React layout blocks
- Contains: `header.tsx`, `side-nav.tsx`
- Pattern: Compose multiple registry UI components into app-level patterns

**`registry/vitality/lib/`:**
- Purpose: Shared utilities distributed with registry components
- Contains: `utils.ts` (the `cn()` class merging function)

**`registry/vitality/hooks/`:**
- Purpose: Distributable React hooks
- Contains: `use-mobile.ts`

**`registry-ng/vitality/ui/`:**
- Purpose: All distributable Angular UI components mirroring Vitality React designs
- Contains: One folder per component with standardized file structure
- Key files per component: `<name>.component.ts`, `<name>.variants.ts`, `<name>.stories.ts`, `index.ts`
- Some complex components have sub-components (e.g., `calendar/calendar-grid.component.ts`, `command/command-input.component.ts`)

**`registry-ng/vitality/lib/`:**
- Purpose: Angular shared utilities and directives
- Contains: `utils.ts`, `core.ts` (re-exports directives), `id.directive.ts`, `string-template-outlet.directive.ts`, `number.ts`

**`registry-ng/.storybook/`:**
- Purpose: Storybook 10 configuration for Angular component development and documentation
- Contains: `main.ts` (webpack config with Tailwind PostCSS), `tsconfig.json` (path aliases), `docs/` (MDX docs), `public/` (static assets)

**`src/app/_components/`:**
- Purpose: Internal components used only by the documentation site (not distributed)
- Contains: Site chrome (sidebar, header, theme toggle), MDX rendering infrastructure, code display
- Key files: `mdx-components.tsx` (MDX component map), `component-source.tsx` (source viewer), `live-preview.tsx` (dynamic demo loader), `app-sidebar.tsx` (navigation), `site-header.tsx`, `command-bar.tsx`

**`src/app/_demos/`:**
- Purpose: Live demo files rendered in component documentation pages
- Contains: Either single `.tsx` files or folders with multiple demo variants
- Pattern: Folders named after component slugs containing `demo.tsx` (primary) and variant files (`size.tsx`, `icon.tsx`, etc.)
- All demo files are `"use client"` components that import from `@/registry/vitality/ui/*`

**`src/app/content/docs/`:**
- Purpose: MDX documentation content compiled at build time
- Contains: `components/` (one `.mdx` per component), `blocks/` (one `.mdx` per block), `getting-started.mdx`
- Pattern: Each MDX file has YAML frontmatter with `title`, `description`, `source`, `registryName`

**`src/app/components/[slug]/`:**
- Purpose: Dynamic Next.js route for component documentation pages
- Contains: `page.tsx` with `generateStaticParams()` for SSG

**`src/app/blocks/[slug]/`:**
- Purpose: Dynamic Next.js route for block documentation pages
- Contains: `page.tsx` with `generateStaticParams()` for SSG

**`src/lib/`:**
- Purpose: Site-level utility modules (not distributed)
- Contains: `utils.ts` (cn helper), `registry.ts` (reads component metadata from MDX frontmatter), `mdx.ts` (MDX compilation with shiki highlighting)

**`src/hooks/`:**
- Purpose: Site-level React hooks (not distributed)
- Contains: `use-mobile.ts`

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout (ThemeProvider, SidebarProvider, header, sidebar, command bar)
- `src/app/page.tsx`: Home page (renders getting-started.mdx)
- `src/app/components/[slug]/page.tsx`: Component documentation pages
- `src/app/blocks/[slug]/page.tsx`: Block documentation pages

**Configuration:**
- `next.config.ts`: Next.js config (static export, base path from env)
- `tsconfig.json`: TypeScript config with `@/*` and `@/registry/*` path aliases
- `components.json`: shadcn CLI config (vitality style, aliases, Tailwind CSS path)
- `registry.json`: Full registry manifest listing all distributable items
- `angular.json`: Angular workspace config for registry-ng Storybook
- `postcss.config.mjs`: PostCSS with `@tailwindcss/postcss`
- `eslint.config.mjs`: ESLint config
- `.prettierrc`: Prettier config

**Styling:**
- `src/app/globals.css`: All CSS custom properties (light + dark theme tokens), Tailwind imports, code block styles, base layer styles

**Core Logic:**
- `src/lib/registry.ts`: Reads MDX frontmatter to build component metadata arrays
- `src/lib/mdx.ts`: MDX compilation with rehype-pretty-code, TOC extraction, path validation
- `src/app/_components/mdx-components.tsx`: Full MDX component map (ComponentPreview, headings, tables, code)
- `src/app/_components/live-preview.tsx`: Dynamic import of demo components
- `src/app/_components/component-source.tsx`: Server-side source code reading and highlighting

**Deployment:**
- `.github/workflows/deploy.yml`: GitHub Actions workflow for GitHub Pages deployment

## Naming Conventions

**Files (React registry):**
- `kebab-case.tsx`: One file per component (e.g., `button.tsx`, `alert-dialog.tsx`, `toggle-group.tsx`)
- Compound components exported from a single file (e.g., `dialog.tsx` exports `Dialog`, `DialogContent`, `DialogTitle`, etc.)

**Files (Angular registry):**
- `kebab-case.component.ts`: Component definition
- `kebab-case.variants.ts`: CVA variant definitions (shared with React)
- `kebab-case.stories.ts`: Storybook stories
- `index.ts`: Barrel file re-exporting component and variants

**Files (Documentation demos):**
- `demo.tsx`: Primary demo for a component (shown on the component page)
- `<variant>.tsx`: Specific variant demos (e.g., `size.tsx`, `icon.tsx`, `destructive.tsx`)
- Folder name matches the component slug from MDX

**Files (MDX content):**
- `<component-slug>.mdx`: One MDX file per component, frontmatter-driven

**React Components:**
- PascalCase function components: `Button`, `AlertDialog`, `CommandInput`
- CVA variants: `const buttonVariants = cva(...)`, exported alongside component

**Angular Components:**
- Class name: `Zard<Name>Component` (e.g., `ZardButtonComponent`, `ZardAlertDialogComponent`)
- Selector: `z-<name>` or `<element>[z-<name>]` (e.g., `z-button`, `button[z-button]`)
- Variant inputs: `z`-prefixed (e.g., `zVariant`, `zSize`, `zShape`)
- Variant types: `Zard<Name><Prop>Variants` (e.g., `ZardButtonVariantVariants`)

**Directories:**
- `kebab-case/` for component folders in Angular (`button/`, `alert-dialog/`)
- `kebab-case/` for demo folders (`button/`, `alert-dialog/`)
- `_`-prefixed for Next.js private directories (`_components/`, `_demos/`)

## Where to Add New Code

**New React UI Component:**
1. Create `registry/vitality/ui/<component-name>.tsx` following the CVA + function component pattern
2. Add entry to `registry.json` with name, type, dependencies, registryDependencies, files
3. Create demo(s) in `src/app/_demos/<component-name>/demo.tsx` (and variant files)
4. Create MDX docs in `src/app/content/docs/components/<component-name>.mdx` with frontmatter
5. Run `npm run registry:build` to generate distributable JSON

**New Angular UI Component:**
1. Create folder `registry-ng/vitality/ui/<component-name>/`
2. Add `<component-name>.variants.ts` (CVA definitions with `z`-prefixed variant names)
3. Add `<component-name>.component.ts` (Angular component using signal inputs)
4. Add `<component-name>.stories.ts` (Storybook stories)
5. Add `index.ts` barrel file
6. Run `npm run registry:build:ng` to generate distributable JSON

**New Block:**
1. Create `registry/vitality/blocks/<block-name>.tsx`
2. Add entry to `registry.json` with type `"registry:block"`
3. Create demo in `src/app/_demos/<block-name>/demo.tsx`
4. Create MDX docs in `src/app/content/docs/blocks/<block-name>.mdx`

**New Documentation-Only Component (site internal):**
- Place in `src/app/_components/<component-name>.tsx`
- These are NOT distributed; they only run on the docs site

**New Hook (distributable):**
- Place in `registry/vitality/hooks/<hook-name>.ts`
- Add entry to `registry.json` with type `"registry:hook"`

**New Shared Utility (distributable):**
- Place in `registry/vitality/lib/<util-name>.ts`
- Add entry to `registry.json` with type `"registry:lib"`

**New Site Utility (docs only):**
- Place in `src/lib/<util-name>.ts`

## Special Directories

**`public/r/`:**
- Purpose: Generated registry JSON files consumed by `npx shadcn add`
- Generated: Yes, by `npm run registry:build` and `npm run registry:build:ng`
- Committed: No (generated at build time in CI)

**`.next/`:**
- Purpose: Next.js build cache and output
- Generated: Yes
- Committed: No

**`out/`:**
- Purpose: Static export output (Next.js + Storybook combined)
- Generated: Yes, by CI pipeline
- Committed: No

**`storybook-static/`:**
- Purpose: Built Storybook output, copied to `out/storybook` during deploy
- Generated: Yes
- Committed: No

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes
- Committed: No

**`src/app/_demos/`:**
- Purpose: Demo files loaded via dynamic import for live previews
- Generated: No (hand-authored)
- Committed: Yes
- Note: The `_` prefix makes this a Next.js private folder (not a route segment)

**`src/app/_components/`:**
- Purpose: Site-internal components used by the docs application
- Generated: No
- Committed: Yes
- Note: The `_` prefix makes this a Next.js private folder (not a route segment)

---

*Structure analysis: 2026-03-04*
