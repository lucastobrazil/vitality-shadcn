# Coding Conventions

**Analysis Date:** 2026-03-04

## Naming Patterns

**Files:**
- UI components: `kebab-case.tsx` (e.g., `registry/vitality/ui/button-group.tsx`, `registry/vitality/ui/alert-dialog.tsx`)
- Hooks: `use-kebab-case.ts` (e.g., `registry/vitality/hooks/use-mobile.ts`, `src/hooks/use-mobile.ts`)
- Lib/utils: `kebab-case.ts` (e.g., `registry/vitality/lib/utils.ts`, `src/lib/registry.ts`)
- Demo files: `kebab-case.tsx` named after the variant they demonstrate (e.g., `src/app/_demos/button/demo.tsx`, `src/app/_demos/button/primary.tsx`)
- App components: `kebab-case.tsx` (e.g., `src/app/_components/app-sidebar.tsx`)
- Pages: `page.tsx` (Next.js App Router convention)

**Functions:**
- React components: `PascalCase` (e.g., `Button`, `DialogContent`, `SidebarMenuButton`)
- Hooks: `camelCase` with `use` prefix (e.g., `useSidebar`, `useIsMobile`, `useFormField`, `useComboboxAnchor`)
- Helper/utility functions: `camelCase` (e.g., `parseFrontmatter`, `readMetas`, `getComponents`, `slugify`)
- CVA variant definitions: `camelCase` with `Variants` suffix (e.g., `buttonVariants`, `badgeVariants`, `calloutVariants`, `spinnerVariants`)

**Variables:**
- Constants: `UPPER_SNAKE_CASE` (e.g., `SIDEBAR_COOKIE_NAME`, `MOBILE_BREAKPOINT`, `THEMES`, `CONTENT_DIR`)
- React context: `PascalCase` + `Context` suffix (e.g., `SidebarContext`, `ChartContext`, `FormFieldContext`)
- State: `camelCase` with descriptive names (e.g., `openMobile`, `isMobile`)

**Types:**
- Type aliases: `PascalCase` (e.g., `DemoMeta`, `ChartConfig`, `SidebarContextProps`, `MdxFrontmatter`, `TocItem`)
- Use `type` keyword (not `interface`) for object type definitions
- Inline types preferred for component props using `React.ComponentProps<>` intersection pattern

## Code Style

**Formatting:**
- No Prettier config detected; formatting is enforced via ESLint
- Semicolons: inconsistent -- some files use trailing semicolons (e.g., `button.tsx`, `chip.tsx`, `tabs.tsx`) and some omit them (e.g., `badge.tsx`, `dialog.tsx`, `card.tsx`). Prefer matching the file you are editing.
- Quotes: double quotes for strings and JSX attributes
- Indentation: 2 spaces
- Trailing commas in multi-line arrays and objects

**Linting:**
- ESLint v9+ with flat config at `eslint.config.mjs`
- Extends `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Strict TypeScript enabled in `tsconfig.json`
- Run linting: `npm run lint`

## Import Organization

**Order:**
1. `"use client"` directive (when needed, always first line)
2. `import * as React from "react"` (always use namespace import for React)
3. Third-party libraries (e.g., `lucide-react`, `radix-ui`, `class-variance-authority`, `next-mdx-remote/rsc`)
4. Blank line
5. Internal utilities (`@/lib/utils`, `@/lib/registry`)
6. Internal UI components (`@/registry/vitality/ui/*`)
7. Internal hooks (`@/hooks/*`)

**Path Aliases:**
- `@/*` maps to `./src/*`
- `@/registry/*` maps to `./registry/*`
- UI components are imported from `@/registry/vitality/ui/[component]`
- Hooks from `@/hooks/[hook]`
- Utilities from `@/lib/utils`

**Radix UI Import Pattern:**
- Import the primitive namespace: `import { Dialog as DialogPrimitive } from "radix-ui"`
- For Slot: `import { Slot } from "radix-ui"`
- Never import from individual `@radix-ui/*` packages; use the unified `radix-ui` package

**Base UI Import Pattern (for Combobox):**
- Import from `@base-ui/react`: `import { Combobox as ComboboxPrimitive } from "@base-ui/react"`

## Component Architecture

**UI Component Pattern (registry components):**
All UI components in `registry/vitality/ui/` follow this strict pattern:

```tsx
// 1. "use client" directive (only if component uses hooks/state/effects)
"use client"

// 2. Imports
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { SomeIcon } from "lucide-react"
import { Primitive as PrimitiveName } from "radix-ui"

import { cn } from "@/lib/utils"

// 3. CVA variant definition (if component has variants)
const componentVariants = cva("base-classes", {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ },
})

// 4. Function declaration components (NOT arrow functions, NOT React.forwardRef)
function Component({
  className,
  variant,
  ...props
}: React.ComponentProps<"element"> & VariantProps<typeof componentVariants>) {
  return (
    <element
      data-slot="component-name"
      data-variant={variant}
      className={cn(componentVariants({ variant, className }))}
      {...props}
    />
  )
}

// 5. Named exports (grouped at bottom, alphabetically sorted)
export { Component, componentVariants }
```

**Key rules for UI components:**
- Use `function` declarations, never arrow functions for components
- Use `React.ComponentProps<"element">` or `React.ComponentProps<typeof Primitive>` for prop types -- never define separate Props interfaces
- Always destructure `className` and spread `...props` last
- Always add `data-slot="component-name"` attribute (kebab-case of the component name)
- Use `cn()` from `@/lib/utils` for className merging
- Use `class-variance-authority` (CVA) for variant management
- Use named exports, never default exports for UI components
- Support `asChild` prop via `Slot.Root` from `radix-ui` when component can render as different elements

**Demo Component Pattern:**
```tsx
"use client"

import { Component } from "@/registry/vitality/ui/component"

export default function ComponentDemo() {
  return (
    // Demo markup showcasing the component
  )
}
```
- Demo components use `default export`
- Always include `"use client"` directive
- Function name: `PascalCase` + `Demo` suffix (e.g., `ButtonDemo`, `DialogDemo`)

**Page Component Pattern (App Router):**
```tsx
export default async function PageName({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  // Server-side logic
  return (/* JSX */)
}
```
- Pages are async server components by default
- Use `generateStaticParams()` for dynamic routes
- Use `generateMetadata()` for page metadata

## data-slot Convention

Every UI component element MUST include a `data-slot` attribute with a kebab-case name:
- Root component: `data-slot="button"`, `data-slot="dialog"`
- Sub-components: `data-slot="dialog-content"`, `data-slot="dialog-header"`, `data-slot="sidebar-menu-button"`
- This enables parent-child CSS targeting via `has-data-[slot=...]` and `*:data-[slot=...]`

## data-* Attribute Convention

Components expose state via `data-*` attributes for CSS targeting:
- `data-variant={variant}` for variant type
- `data-size={size}` for size variant
- `data-state="expanded" | "collapsed"` for toggle state
- `data-active={isActive}` for active state
- `data-inset={inset}` for inset layout
- `data-side="left" | "right"` for directional components
- `data-severity={severity}` for severity levels

## Styling

**Framework:** Tailwind CSS v4 with `@tailwindcss/postcss` plugin

**Utility Function:**
```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**CSS Variables:** All colors use CSS custom properties defined in `src/app/globals.css`:
- Semantic color tokens: `--primary`, `--destructive`, `--success`, `--warning`, `--info`, `--brand`
- Foreground variants: `--primary-foreground`, `--destructive-foreground`, etc.
- Component-specific: `--sidebar`, `--sidebar-foreground`, `--sidebar-accent`
- Color space: `oklch()` for most colors

**Dark Mode:** Class-based via `next-themes` with `attribute="class"`:
- Light styles by default
- Dark overrides via `dark:` prefix in Tailwind or `.dark` selector in CSS
- Custom variant: `@custom-variant dark (&:is(.dark *))`

## Error Handling

**Patterns:**
- Context hooks throw descriptive errors when used outside providers:
  ```typescript
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  ```
- File operations check existence before reading: `fs.existsSync(path)`
- Path traversal protection: `if (!resolved.startsWith(CONTENT_DIR + path.sep))` in `src/lib/mdx.ts`
- Graceful fallbacks in UI: return placeholder JSX when data is missing (see `src/app/_components/component-source.tsx`)
- `notFound()` from Next.js for invalid dynamic routes (see `src/app/components/[slug]/page.tsx`)
- Form validation errors displayed via `FormMessage` component using `react-hook-form` state
- Components return `null` for conditional rendering (e.g., `FormMessage` returns null when no error)

## Logging

**Framework:** No dedicated logging framework. Console is used sparingly.

**Patterns:**
- No structured logging detected in the codebase
- Error boundaries and error states handled via UI components rather than logging

## Comments

**When to Comment:**
- Brief inline comments for non-obvious logic (e.g., `// This is the internal state of the sidebar.`)
- `// Helper to ...` prefix for utility functions within component files
- `// Format: { THEME_NAME: CSS_SELECTOR }` for constant documentation
- Comments in CSS for section separation (e.g., `/* MDX content wrapper */`)

**JSDoc/TSDoc:**
- Not used in this codebase
- Type information is conveyed through TypeScript types inline

## Function Design

**Size:** Components are single-responsibility. Complex components (e.g., `sidebar.tsx` at ~727 lines) contain many small sub-components in a single file.

**Parameters:** Use destructured props with rest spreading:
```typescript
function Component({ className, variant, size, children, ...props }: PropsType) {
```

**Return Values:** JSX elements. Hooks return objects or primitives.

## Module Design

**Exports:** Named exports for UI components; both component and variants are exported:
```typescript
export { Button, buttonVariants }
export { Badge, badgeVariants }
```

**Barrel Files:** Not used. Each component file exports its own items directly. Import directly from the component file.

**Default Exports:** Used only for:
- Demo components (`src/app/_demos/*`)
- Next.js pages (`page.tsx`)
- Next.js layout (`layout.tsx`)
- Config files (`next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`)

---

*Convention analysis: 2026-03-04*
