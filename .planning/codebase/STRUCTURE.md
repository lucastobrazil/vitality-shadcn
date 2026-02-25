# Codebase Structure

**Analysis Date:** 2026-02-25

## Directory Layout

```
shaddo-dayoff/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Pages CI/CD pipeline
├── .planning/
│   └── codebase/                   # SAUCE codebase analysis docs
├── packages/
│   └── cli/                        # (Empty/unused CLI package)
├── public/
│   ├── r/                          # Generated React registry JSON (gitignored)
│   │   ├── {component}.json        # Per-component JSON manifests
│   │   ├── cli/components/         # Angular CLI component JSONs
│   │   └── ng/                     # Angular registry JSONs
│   ├── logo.svg                    # Vitality logo
│   └── ...                         # Static assets
├── registry/
│   └── vitality/
│       ├── blocks/                 # React block components (header, side-nav)
│       ├── hooks/                  # React hooks (use-mobile)
│       ├── lib/                    # Shared utilities (utils.ts)
│       └── ui/                     # React UI components (one .tsx per component)
├── registry-ng/
│   ├── .storybook/                 # Angular Storybook configuration
│   │   ├── main.ts                 # Storybook config (stories glob, addons, webpack)
│   │   ├── preview.ts              # Theme decorators, autodocs
│   │   ├── tsconfig.json           # Angular-specific TS paths
│   │   ├── manager.ts              # Storybook manager customization
│   │   ├── docs-page.ts            # Custom docs page component
│   │   ├── main.entry.ts           # Angular build entry point
│   │   └── index.html              # Storybook HTML shell
│   └── vitality/
│       ├── lib/                    # Angular shared utilities
│       │   ├── utils.ts            # cn() + Angular-specific helpers
│       │   ├── core.ts             # Barrel export for directives
│       │   ├── id.directive.ts     # Unique ID generation directive
│       │   ├── number.ts           # Number utilities
│       │   └── string-template-outlet.directive.ts  # Template outlet directive
│       └── ui/                     # Angular UI components (one dir per component)
│           ├── {component}/
│           │   ├── {component}.component.ts   # Component class
│           │   ├── {component}.variants.ts    # CVA variant definitions
│           │   ├── {component}.stories.ts     # Storybook stories
│           │   └── index.ts                   # Barrel export (some components)
│           └── ...
├── src/
│   ├── app/
│   │   ├── _components/            # Doc site internal components
│   │   │   ├── app-sidebar.tsx     # Main sidebar navigation
│   │   │   ├── code-block.tsx      # Expandable syntax-highlighted code block
│   │   │   ├── command-bar.tsx     # Cmd+K command palette
│   │   │   ├── demo-preview.tsx    # Component demo renderer (server)
│   │   │   ├── install-command.tsx # Copy-to-clipboard install command
│   │   │   ├── live-preview.tsx    # Dynamic component preview (client)
│   │   │   ├── mobile-header.tsx   # Mobile sidebar trigger
│   │   │   ├── shiki.ts           # Syntax highlighting setup
│   │   │   └── theme-toggle.tsx   # Light/dark mode toggle
│   │   ├── _demos/                 # Live demo components (one per UI component)
│   │   │   ├── accordion.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   └── ...                # ~50 demo files
│   │   ├── blocks/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Dynamic block documentation page
│   │   ├── components/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Dynamic component documentation page
│   │   ├── globals.css            # Tailwind v4 theme (CSS variables, light/dark)
│   │   ├── layout.tsx             # Root layout (providers, sidebar, content)
│   │   ├── metaprompt-setup.md    # LLM setup instructions (displayed on home)
│   │   ├── page.tsx               # Home page ("Getting Started")
│   │   ├── providers.tsx          # ThemeProvider wrapper
│   │   └── registry.ts           # Component/block metadata array
│   ├── hooks/
│   │   └── use-mobile.ts         # Mobile breakpoint hook
│   └── lib/
│       └── utils.ts              # cn() utility for doc site
├── angular.json                   # Angular workspace config for Storybook
├── components.json                # shadcn/ui configuration
├── eslint.config.mjs              # ESLint configuration
├── next.config.ts                 # Next.js config (static export)
├── package.json                   # Root package manifest
├── postcss.config.mjs             # PostCSS config (Tailwind v4)
├── registry.json                  # React registry manifest (component list)
├── tsconfig.json                  # TypeScript config (Next.js)
├── COMPONENT-ALIGNMENT.md         # Component alignment documentation
└── SCAFFOLD.md                    # Scaffolding documentation
```

## Directory Purposes

**`registry/vitality/`:**
- Purpose: Source-of-truth React UI components for the shadcn registry
- Contains: Single `.tsx` files per component, blocks, hooks, and utility functions
- Key files: `registry/vitality/ui/button.tsx`, `registry/vitality/ui/badge.tsx`, `registry/vitality/blocks/header.tsx`, `registry/vitality/lib/utils.ts`

**`registry-ng/vitality/`:**
- Purpose: Angular port of the component library (parallel to React registry)
- Contains: Multi-file components (component + variants + stories), shared directives/utilities
- Key files: `registry-ng/vitality/ui/button/button.component.ts`, `registry-ng/vitality/lib/utils.ts`, `registry-ng/vitality/lib/core.ts`

**`src/app/`:**
- Purpose: Next.js App Router documentation site
- Contains: Pages, layouts, internal components, demo files
- Key files: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/registry.ts`

**`src/app/_components/`:**
- Purpose: Internal components used only by the documentation site (not distributed)
- Contains: Sidebar, code blocks, command palette, previews
- Key files: `src/app/_components/demo-preview.tsx`, `src/app/_components/live-preview.tsx`, `src/app/_components/app-sidebar.tsx`

**`src/app/_demos/`:**
- Purpose: Live interactive demos for each UI component
- Contains: One `"use client"` React component per UI component, default-exported
- Key files: `src/app/_demos/button.tsx`, `src/app/_demos/badge.tsx`

**`public/r/`:**
- Purpose: Generated JSON registry manifests consumed by shadcn CLI
- Contains: Per-component JSON files with source code and dependency metadata
- Generated: Yes (by `npm run registry:build` and `npm run registry:build:ng`)
- Committed: No (gitignored)

**`registry-ng/.storybook/`:**
- Purpose: Storybook 10.x configuration for Angular components
- Contains: Webpack config, preview decorators, theme setup, docs customization
- Key files: `registry-ng/.storybook/main.ts`, `registry-ng/.storybook/preview.ts`, `registry-ng/.storybook/tsconfig.json`

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout with providers, sidebar, and content wrapper
- `src/app/page.tsx`: Home page (Getting Started guide)
- `src/app/components/[slug]/page.tsx`: Component documentation pages
- `src/app/blocks/[slug]/page.tsx`: Block documentation pages
- `registry-ng/.storybook/main.ts`: Angular Storybook entry

**Configuration:**
- `package.json`: Dependencies, scripts (dev, build, registry:build, storybook)
- `tsconfig.json`: TypeScript config with `@/*` and `@/registry/*` path aliases
- `registry-ng/.storybook/tsconfig.json`: Angular TS config with `@/lib/*` and `@/ui/*` aliases
- `angular.json`: Angular workspace config (Storybook builder targets)
- `components.json`: shadcn/ui style config (vitality style, path aliases)
- `registry.json`: React component registry manifest (all 50+ items)
- `next.config.ts`: Static export, base path, unoptimized images
- `postcss.config.mjs`: Tailwind v4 via `@tailwindcss/postcss`

**Core Logic:**
- `src/app/registry.ts`: Component metadata definitions (drives all navigation and pages)
- `src/app/_components/live-preview.tsx`: Dynamic import map for all demos
- `src/app/_components/demo-preview.tsx`: Server-side code reading + syntax highlighting
- `src/app/_components/shiki.ts`: Shiki highlighter singleton

**Styling:**
- `src/app/globals.css`: Tailwind v4 theme with CSS custom properties

**Deployment:**
- `.github/workflows/deploy.yml`: Build + deploy pipeline to GitHub Pages

## Naming Conventions

**Files (React registry):**
- Pattern: `kebab-case.tsx` (single file per component)
- Examples: `button.tsx`, `alert-dialog.tsx`, `toggle-group.tsx`, `status-badge.tsx`

**Files (Angular registry):**
- Pattern: `kebab-case/kebab-case.{component,variants,stories,service}.ts`
- Examples: `button/button.component.ts`, `button/button.variants.ts`, `dialog/dialog.service.ts`

**Files (Doc site):**
- Pattern: `kebab-case.tsx` for components, `page.tsx` for routes
- Internal components prefixed with underscore directory: `_components/`, `_demos/`

**Directories:**
- Pattern: `kebab-case` for all directories
- Angular components: one directory per component matching component name

**React Component Exports:**
- Pattern: PascalCase named exports (e.g., `Button`, `Badge`, `AlertDialog`)
- Variant exports: camelCase (e.g., `buttonVariants`, `badgeVariants`)

**Angular Component Classes:**
- Pattern: `Zard{Name}Component` (e.g., `ZardButtonComponent`, `ZardBadgeComponent`)
- Variant types: `Zard{Name}{Prop}Variants` (e.g., `ZardButtonVariantVariants`)
- Services: `Zard{Name}Service` (e.g., `ZardDialogService`)
- Directives: `Zard{Name}Directive` (e.g., `ZardTooltipDirective`)

**Angular Selectors:**
- Components: `z-{name}` (e.g., `z-button`, `z-badge`, `z-icon`)
- Attribute selectors: `button[z-button]`, `a[z-button]` for semantic elements
- Directives: `[zTooltip]`, `[zardId]`
- Export names: `z{Name}` (e.g., `zButton`, `zBadge`, `zTooltip`)

**Angular Inputs:**
- Pattern: Prefixed with `z` (e.g., `zVariant`, `zSize`, `zShape`, `zLoading`, `zDisabled`)

## Where to Add New Code

**New React UI Component:**
1. Create component file: `registry/vitality/ui/{component-name}.tsx`
2. Follow CVA pattern: define `{name}Variants` with `cva()`, export component + variants
3. Add entry to `registry.json` with name, type, dependencies, files
4. Create demo: `src/app/_demos/{component-name}.tsx` (must be `"use client"`, default export)
5. Add to demos map: `src/app/_components/live-preview.tsx`
6. Add metadata to: `src/app/registry.ts` (components or blocks array)
7. Run `npm run registry:build` to generate JSON

**New Angular UI Component:**
1. Create directory: `registry-ng/vitality/ui/{component-name}/`
2. Create variants file: `{component-name}.variants.ts` with CVA definitions using `z`-prefixed props
3. Create component file: `{component-name}.component.ts` using Angular signals pattern
4. Create stories file: `{component-name}.stories.ts` for Storybook documentation
5. Optionally create `index.ts` barrel export
6. Run `npm run registry:build:ng` to generate JSON

**New React Block:**
1. Create block file: `registry/vitality/blocks/{block-name}.tsx`
2. Add entry to `registry.json` with `type: "registry:block"`
3. Create demo: `src/app/_demos/{block-name}.tsx`
4. Add to demos map: `src/app/_components/live-preview.tsx`
5. Add metadata to blocks array in: `src/app/registry.ts`

**New Documentation Page:**
- Add a new directory under `src/app/{route-name}/` with `page.tsx`

**New Shared Utility (React):**
- Add to `registry/vitality/lib/utils.ts` or create new file in `registry/vitality/lib/`
- Add to `registry.json` as `type: "registry:lib"`

**New Shared Utility (Angular):**
- Add to `registry-ng/vitality/lib/` directory
- Export from `registry-ng/vitality/lib/core.ts` if it's a directive

**New Hook (React):**
- Add to `registry/vitality/hooks/`
- Add to `registry.json` as `type: "registry:hook"`

## Special Directories

**`out/`:**
- Purpose: Next.js static export output
- Generated: Yes (by `npm run build`)
- Committed: No (gitignored)
- Note: Storybook is copied into `out/storybook/` during CI

**`public/r/`:**
- Purpose: Registry JSON manifests
- Generated: Yes (by `npm run registry:build` and `npm run registry:build:ng`)
- Committed: No (gitignored)

**`.next/`:**
- Purpose: Next.js build cache
- Generated: Yes
- Committed: No (gitignored)

**`storybook-static/`:**
- Purpose: Built Storybook output
- Generated: Yes (by `npm run storybook:build`)
- Committed: No (gitignored)

**`.angular/`:**
- Purpose: Angular build cache
- Generated: Yes
- Committed: No (gitignored)

**`node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes
- Committed: No (gitignored)

**`packages/cli/`:**
- Purpose: Previously contained a CLI tool (now removed/empty)
- Generated: No
- Committed: Yes but inactive

---

*Structure analysis: 2026-02-25*
