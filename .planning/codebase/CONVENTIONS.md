# Coding Conventions

**Analysis Date:** 2026-02-25

## Project Duality

This codebase contains **two parallel component registries** for the same "Vitality" design system:

1. **React (Next.js)** - `registry/vitality/ui/` - shadcn/ui-based components
2. **Angular** - `registry-ng/vitality/ui/` - Angular ports of the same components

Plus a **Next.js documentation site** in `src/app/` that serves as the registry frontend.

Each registry has distinct conventions. Follow the conventions for the framework you are working in.

---

## React Component Conventions (registry/vitality/ui/)

### Naming Patterns

**Files:**
- Use kebab-case for all file names: `button.tsx`, `alert-dialog.tsx`, `input-otp.tsx`
- One file per component (or component group for related sub-components like Card)

**Components:**
- Use PascalCase function names: `Button`, `CardHeader`, `DialogContent`
- Name sub-components with parent prefix: `Card` + `CardHeader`, `CardTitle`, `CardContent`, `CardFooter`

**Exports:**
- Named exports only, no default exports from UI component files
- Export both the component and its variants (if any): `export { Button, buttonVariants }`

**Variant Constants:**
- camelCase with `Variants` suffix: `buttonVariants`, `alertVariants`, `sidebarMenuButtonVariants`

### Component Structure Pattern

All React UI components follow this exact pattern:

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"  // if variants needed
import { Slot } from "radix-ui"  // if asChild support needed
import { cn } from "@/lib/utils"

// 1. Define variants (if component has visual variants)
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", primary: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

// 2. Define component as a named function (NOT arrow function, NOT forwardRef)
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"          // ALWAYS include data-slot
      data-variant={variant}      // Surface variant as data attribute
      data-size={size}            // Surface size as data attribute
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

// 3. Named exports
export { Button, buttonVariants }
```

### Key Patterns

**data-slot attribute:** Every rendered element MUST have a `data-slot` attribute with a kebab-case identifier. This is used for CSS targeting and debugging. Examples: `data-slot="button"`, `data-slot="card-header"`, `data-slot="dialog-content"`.

**className merging:** Always use `cn()` from `@/lib/utils` to merge class names. Never concatenate strings manually for Tailwind classes.

**Props spreading:** Destructure known props, spread the rest with `{...props}` as the last attribute on the root element.

**"use client" directive:** Only add `"use client"` at the top when the component uses client-side APIs (hooks, event handlers, browser APIs). Pure presentational components that only render JSX do NOT need it.

**asChild pattern:** Components that support polymorphism use `asChild` prop with `Slot.Root` from `radix-ui`.

**Component typing:** Use `React.ComponentProps<"element">` for native element props, NOT `React.HTMLAttributes`. For Radix primitives, use `React.ComponentProps<typeof Primitive>`.

### Import Organization

**Order:**
1. React imports: `import * as React from "react"`
2. Third-party libraries: `cva`, `lucide-react`, `radix-ui`
3. Internal aliases: `@/lib/utils`, `@/registry/vitality/ui/...`, `@/hooks/...`

**Path Aliases (React/Next.js):**
- `@/*` maps to `./src/*`
- `@/registry/*` maps to `./registry/*`

---

## Angular Component Conventions (registry-ng/vitality/ui/)

### Naming Patterns

**Files:**
- `{component-name}.component.ts` - Main component
- `{component-name}.variants.ts` - CVA variant definitions (separate file)
- `{component-name}.stories.ts` - Storybook stories
- `{sub-component}.component.ts` - Sub-components in same directory (e.g., `accordion-item.component.ts`)
- `{component-name}.service.ts` - Injectable services (for overlays like dialog, sheet)
- `{component-name}.directive.ts` - Directive-based components (e.g., input, tooltip)

**Directories:**
- One directory per component family: `button/`, `badge/`, `accordion/`
- kebab-case directory names matching the component name

**Classes:**
- Prefix all classes with `Zard`: `ZardButtonComponent`, `ZardBadgeComponent`, `ZardDialogService`
- Sub-components: `ZardAccordionItemComponent`, `ZardSelectItemComponent`

**Selectors:**
- Element selectors: `z-{name}` - `z-button`, `z-badge`, `z-accordion`
- Attribute selectors for native element enhancement: `button[z-button]`, `input[z-input]`, `a[z-button]`
- Combined: `selector: 'z-button, button[z-button], a[z-button]'`

**Input naming:**
- Prefix with `z`: `zVariant`, `zSize`, `zType`, `zLoading`, `zDisabled`
- Exception: `class` input for custom CSS class pass-through (always `ClassValue` type from clsx)

**Export aliases:**
- Always provide `exportAs`: `exportAs: 'zButton'`, `exportAs: 'zBadge'`

### Component Structure Pattern

```typescript
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import type { ClassValue } from 'clsx';

import { cn } from '@/lib/utils';
import { badgeVariants, type ZardBadgeVariantVariants } from './badge.variants';

@Component({
  selector: 'z-badge',
  // Standalone by default (Angular 21) - no standalone: true needed
  imports: [/* other Zard components if needed */],
  template: `
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,  // ALWAYS OnPush
  encapsulation: ViewEncapsulation.None,             // ALWAYS None (Tailwind needs global scope)
  host: {
    '[class]': 'classes()',                           // Bind computed classes to host
  },
  exportAs: 'zBadge',
})
export class ZardBadgeComponent {
  // Signal-based inputs (Angular 17+ style)
  readonly zVariant = input<ZardBadgeVariantVariants>('default');
  readonly class = input<ClassValue>('');

  // Computed class binding using cn()
  protected readonly classes = computed(() =>
    cn(badgeVariants({ zVariant: this.zVariant() }), this.class()),
  );
}
```

### Variant File Pattern

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva('base-classes', {
  variants: {
    zVariant: { default: '...', primary: '...' },  // Prefix with z
    zSize: { default: '...', sm: '...' },           // Prefix with z
  },
  defaultVariants: {
    zVariant: 'default',
    zSize: 'default',
  },
});

// Export type aliases for each variant dimension
export type ZardButtonVariantVariants = NonNullable<VariantProps<typeof buttonVariants>['zVariant']>;
export type ZardButtonSizeVariants = NonNullable<VariantProps<typeof buttonVariants>['zSize']>;
```

### Key Angular Patterns

**Change Detection:** Always use `ChangeDetectionStrategy.OnPush`. No exceptions.

**View Encapsulation:** Always use `ViewEncapsulation.None`. Tailwind CSS classes require global scope to work.

**Signal API:** Use Angular signal-based APIs exclusively:
- `input()` / `input.required()` for inputs
- `output()` for outputs
- `model()` for two-way binding
- `signal()` for internal state
- `computed()` for derived values
- `viewChild()` / `contentChildren()` for queries
- `effect()` for side effects

**Host binding:** Use the `host` property in `@Component` metadata, NOT `@HostBinding` or `@HostListener` decorators.

**Overlay-based components:** Dialog, Sheet, Dropdown, Select, Tooltip, Popover all use `@angular/cdk/overlay` for positioning. Follow the overlay pattern in `registry-ng/vitality/ui/dropdown/dropdown.component.ts`.

**ControlValueAccessor:** Form components (Input, Select, Checkbox) implement `ControlValueAccessor` with `forwardRef(() => Component)` in providers.

**Path Aliases (Angular):**
- `@/lib/*` maps to `vitality/lib/*`
- `@/ui/*` maps to `vitality/ui/*`

---

## Next.js App Conventions (src/app/)

### File Patterns

**Pages:** `src/app/{route}/page.tsx` (Next.js App Router)
**Components:** `src/app/_components/{name}.tsx` (underscore-prefixed directory = private)
**Demos:** `src/app/_demos/{component-slug}.tsx` (one demo per registry component)

### Naming

- Component files: kebab-case `demo-preview.tsx`, `code-block.tsx`
- Demo files: match the component slug from `src/app/registry.ts`
- Export functions: PascalCase `DemoPreview`, `CodeBlock`
- Demo exports: `export default function ButtonDemo()` (default export for dynamic imports)

### Demo Component Pattern

```tsx
"use client"

import { Button } from "@/registry/vitality/ui/button"

export default function ButtonDemo() {
  return (
    <div className="space-y-6">
      {/* Group variants into labeled sections */}
      <div>
        <p className="mb-2 text-sm font-medium">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
        </div>
      </div>
    </div>
  )
}
```

---

## Styling Conventions

### Tailwind CSS v4

- Use Tailwind v4 with `@tailwindcss/postcss` plugin
- CSS variables for all color tokens defined in `src/app/globals.css`
- Semantic color tokens: `primary`, `secondary`, `destructive`, `warning`, `success`, `info`, `brand`, `muted`, `accent`
- Use CSS variable references: `bg-primary`, `text-muted-foreground`, NOT raw hex values

### Class Variance Authority (CVA)

- Define variant classes using `cva()` from `class-variance-authority`
- Always set `defaultVariants`
- React: variant keys use bare names (`variant`, `size`, `severity`)
- Angular: variant keys use `z`-prefixed names (`zVariant`, `zSize`, `zSeverity`)

### The cn() Utility

Always use the `cn()` function (clsx + tailwind-merge) for class composition:

```typescript
// React: registry/vitality/lib/utils.ts
// Angular: registry-ng/vitality/lib/utils.ts
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## Error Handling

**React Components:**
- No try/catch in UI components; errors propagate to React error boundaries
- Use `throw new Error()` for invalid context usage (e.g., `useSidebar` outside `SidebarProvider`)

**Angular Components:**
- `console.error()` for overlay creation failures (non-fatal)
- `console.warn()` for invalid selections (non-fatal)
- `throw new Error()` for invalid configuration (e.g., array default values with single-type accordion)
- SSR safety: check `isPlatformBrowser()` before DOM operations

---

## Comments

**When to Comment:**
- Only for non-obvious behavior or workarounds
- Inline comments explaining "why", not "what"
- No JSDoc/TSDoc on component props (types are self-documenting)

**Examples from codebase:**
```typescript
// This is the internal state of the sidebar.
// We use openProp and setOpenProp for control from outside the component.

// Increases the hit area of the button on mobile.
"after:absolute after:-inset-2 md:after:hidden",

// addon-styling-webpack strips Angular's CSS rules (?ngResource / ?ngGlobalStyle)
// and replaces them with a flat /\.css$/ rule. This breaks Angular component styles.
```

---

## TypeScript

**Strict mode** is enabled in both `tsconfig.json` files.

**Type imports:** Use `import type` for type-only imports: `import type { VariantProps } from 'class-variance-authority'`

**React:** Use `React.ComponentProps<"element">` for all component prop types.

**Angular:** Use `type` keyword in import lists for Angular type imports: `type OnDestroy`, `type TemplateRef`, `type ComponentRef`.

---

*Convention analysis: 2026-02-25*
