# Plan: Migrate Rich Component Docs from ui/ to shaddo-dayoff

## Context

shaddo-dayoff's component docs are minimal stubs (~21 lines each — just frontmatter, install, import, preview). The ui/ repo (shadcn/ui) has comprehensive docs (~150+ lines each) with multiple example variations, API reference tables, installation guides, code blocks, and usage examples. We're bringing that rich content into shaddo-dayoff.

**Source:** `ui/apps/v4/content/docs/components/radix/` (62 docs)
**Target:** `shaddo-dayoff/content/docs/components/` (59 docs, 54 overlap)

**User decisions:**
- Source variant: **radix/**
- Demos: **Folder-per-component** (e.g., `_demos/button/size.tsx`)
- MDX components: **Build CodeTabs, Steps, ComponentSource**
- Scope: **All 54 overlapping components**

---

## Phase 1: Infrastructure — New MDX Components

### 1A. Create Steps/Step components
**Create:** `shaddo-dayoff/src/app/_components/steps.tsx`
- `Steps` — div wrapper with `[counter-reset:step]` CSS
- `Step` — h3 with counter-increment styling
- Pattern matches ui/ `mdx-components.tsx:279-296`

**Modify:** `shaddo-dayoff/src/app/globals.css`
- Add CSS counter styles for `.step::before` numbering (circle with number, border-left line on md+)

### 1B. Create CodeTabs component
**Create:** `shaddo-dayoff/src/app/_components/code-tabs.tsx`
- Client component wrapping `@/registry/vitality/ui/tabs`
- Exports: `CodeTabs`, `CodeTabsList`, `CodeTabsTrigger`, `CodeTabsContent`
- Manages CLI vs Manual tab state
- Styled to match docs aesthetic (transparent bg, border-bottom active indicator)

### 1C. Create ComponentSource component
**Create:** `shaddo-dayoff/src/app/_components/component-source.tsx`
- Server component that reads from `registry/vitality/ui/{name}.tsx`
- Highlights with existing `shiki.ts` highlighter
- Renders in existing `CodeBlock` with optional `title` prop
- Graceful fallback if file doesn't exist

### 1D. Create Callout MDX wrapper
**Create:** `shaddo-dayoff/src/app/_components/callout.tsx`
- Wraps existing `@/registry/vitality/ui/callout` for MDX use
- Used by ~8 component docs (chart, sidebar, pagination, etc.)

### 1E. Register all new components
**Modify:** `shaddo-dayoff/src/app/_components/mdx-components.tsx`
- Add: `ComponentSource`, `CodeTabs`, `Steps`, `Step`, `Callout`, `TabsList`, `TabsTrigger`, `TabsContent`
- Update `ComponentPreview` to support folder-based demo paths (Phase 2B)

---

## Phase 2: Demo System Refactor

### 2A. Update LivePreview for nested paths
**Modify:** `shaddo-dayoff/src/app/_components/live-preview.tsx`
- Existing `dynamic(() => import(`../_demos/${slug}`))` should handle `slug="button/size"` natively
- **Test early** — webpack context may need configuration for nested directories
- If fails: use explicit dynamic import map or webpack `require.context`

### 2B. Update ComponentPreview for folder-based demos
**Modify:** `shaddo-dayoff/src/app/_components/mdx-components.tsx` (ComponentPreview function)
- Support both `name="button"` (legacy) and `name="button/size"` (new)
- Fallback: if `_demos/button.tsx` doesn't exist, check `_demos/button/demo.tsx`
- Read source from resolved path for code display

### 2C. Update registry.ts for folder demos
**Modify:** `shaddo-dayoff/src/lib/registry.ts`
- `hasDemo` check: also look for `_demos/{slug}/demo.tsx` alongside `_demos/{slug}.tsx`

### 2D. Proof of concept — migrate button
- Create `_demos/button/` folder with `demo.tsx` (move existing) + `size.tsx`, `outline.tsx`, etc.
- Migrate `button.mdx` with full rich content
- **Verify:** page renders, all previews work, tabs switch, steps number correctly

---

## Phase 3: MDX Content Migration (54 components)

### Transformation rules applied to each component:

**Frontmatter:** Keep shaddo-dayoff format (`title`, `description`, `registryName`, `isCustom`). Use richer `title`/`description` from ui/ where better.

**ComponentPreview:** `<ComponentPreview styleName="radix-nova" name="button-size" />` → `<ComponentPreview name="button/size" />`

**Installation:** Replace raw `npx shadcn@latest add {name}` bash block with `<InstallCommand name="{name}" />` inside CodeTabs. Strip `styleName` from ComponentSource. Update title to `registry/vitality/ui/{name}.tsx`.

**Usage imports:** `@/components/ui/` → `@/registry/vitality/ui/`

**Internal links:** `/docs/components/radix/{name}` → `/components/{name}`

**RTL sections:** Remove entirely.

**API Reference:** Keep as-is (markdown tables + Radix doc links).

### Migration batches:

| Batch | Components | Count |
|-------|-----------|-------|
| 1 — Simple | separator, skeleton, label, progress, switch, toggle, badge, kbd, spinner, aspect-ratio | 10 |
| 2 — Medium | button, checkbox, avatar, accordion, collapsible, tooltip, popover, hover-card, scroll-area, slider, textarea, radio-group, toggle-group | 13 |
| 3 — Complex | dialog, sheet, drawer, dropdown-menu, context-menu, menubar, select, command, combobox, tabs, table, card, input, input-group, input-otp, breadcrumb, pagination, navigation-menu, native-select, field | 20 |
| 4 — Special | button-group, calendar, carousel, chart, sonner, sidebar, resizable, empty, item, direction, collapsible | 11 |

---

## Phase 4: Demo File Creation (~380 files across 54 folders)

For each component:
1. Create `_demos/{component}/` folder
2. Move existing `_demos/{component}.tsx` → `_demos/{component}/demo.tsx`
3. Create variant files from ui/ `examples/radix/{component}-{variant}.tsx`
4. Transform imports: `@/examples/radix/ui/` → `@/registry/vitality/ui/`
5. Add `"use client"` where needed
6. Delete original `_demos/{component}.tsx`

**Naming:** `button-size.tsx` in ui/ → `button/size.tsx` in shaddo-dayoff

---

## Phase 5: Verification

- `pnpm build` after each batch to catch static export failures
- Visual check each component page: previews render, tabs switch, steps number, TOC generates
- Check dynamic import resolution for nested `_demos/` folders
- Verify no missing registry components referenced by demos

---

## Key Files

| File | Role |
|------|------|
| `shaddo-dayoff/src/app/_components/mdx-components.tsx` | Central MDX registry — all new components registered here |
| `shaddo-dayoff/src/app/_components/live-preview.tsx` | Dynamic demo loader — must handle nested paths |
| `shaddo-dayoff/src/lib/registry.ts` | Component discovery — folder demo detection |
| `shaddo-dayoff/src/app/globals.css` | Steps counter CSS |
| `ui/apps/v4/content/docs/components/radix/*.mdx` | Source docs to migrate |
| `ui/apps/v4/examples/radix/*.tsx` | Source demo files to adapt |

---

## Risks

1. **Webpack dynamic import context** — `import(`../_demos/${slug}`)` may not resolve nested dirs. Test in Phase 2D before bulk migration.
2. **Missing registry components** — some ui/ demos import components not in shaddo-dayoff's registry. Check each batch.
3. **Client/server boundary** — CodeTabs is client, but contains server-rendered MDX children. Verify hydration.

---

## Resume Instructions

To resume this work, run:
```
/sauce:plan-phase — reference this file at shaddo-dayoff/.planning/DOCS-MIGRATION-PLAN.md
```

Or simply ask Claude to execute the plan starting from Phase 1.
