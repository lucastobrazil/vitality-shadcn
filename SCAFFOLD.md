# shadcn-ng Registry Scaffold

Create a self-hosted shadcn-ng (Angular) component registry, parallel to the existing React registry.

## Steps

### 1. Scaffold

The Angular registry lives in `registry-ng/` with its own config. No `npx init` — the structure is manual:

- `registry-ng/` — Angular registry root
- `registry-ng/vitality/ui/` — component source files
- `registry-ng/vitality/lib/` — shared utilities
- `registry-ng/components.json` — shadcn-ng config
- `registry-ng/registry.json` — component metadata
- `public/r/ng/` — built registry output

### 2. Add all components

Source: https://github.com/zard-ui/zardui/tree/master/libs/zard/src/lib/shared/components

Each zard-ui component is a multi-file directory:

```
components/<name>/
  <name>.component.ts    ← Angular @Component or @Directive (the actual UI piece)
  <name>.variants.ts     ← CVA variants definition (buttonVariants, badgeVariants, etc.)
  <name>.service.ts      ← Service (only some components, e.g. dialog, toast)
  <name>-ref.ts          ← Ref class (only some components, e.g. dialog)
  index.ts               ← Barrel re-exports
  demo/                  ← Ignore
  doc/                   ← Ignore
  *.spec.ts              ← Ignore
```

#### Porting rules

Preserve the original file structure. Each component gets a directory at `registry-ng/vitality/ui/<name>/` mirroring the zard-ui layout (minus demo, doc, specs, and barrel).

1. **Copy the source files** into `registry-ng/vitality/ui/<name>/`:
   - `<name>.component.ts`
   - `<name>.variants.ts`
   - `<name>.service.ts` (if present)
   - `<name>-ref.ts` (if present)
2. **Skip** `demo/`, `doc/`, `index.ts`, and `*.spec.ts` files entirely.
3. **Replace imports:**
   - `@/shared/utils/merge-classes` → `@/lib/utils` (our `cn()` function)
   - `mergeClasses(...)` → `cn(...)` (rename the function call)
   - Cross-component imports like `'../icon/icon.component'` → `'@/ui/icon/icon.component'` (registry path)
   - `'@/shared/core/...'` → evaluate whether to port the core utility or inline it
4. **Dependencies in `registry.json`:**
   - `class-variance-authority` — all components with CVA variants
   - `clsx`, `tailwind-merge` — via `utils` registryDependency
   - `@angular/cdk` — components using CDK (overlay, portal, a11y, drag-drop)
   - Any other npm packages imported by the component
5. **Use `registryDependencies`** for cross-component references (e.g. dialog depends on button and icon).

#### Example: badge (simple component)

Zard source files:

- `badge.variants.ts` — exports `badgeVariants` CVA definition + type aliases
- `badge.component.ts` — `@Component` using `badgeVariants` and `mergeClasses`

Registry output at `registry-ng/vitality/ui/badge/`:

`badge.variants.ts`:

```ts
import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center justify-center border px-2 py-0.5 text-xs font-medium ...",
  {
    variants: {
      zType: {
        default: "border-transparent bg-primary text-primary-foreground ...",
        secondary: "...",
        destructive: "...",
        outline: "...",
      },
      zShape: {
        default: "rounded-md",
        square: "rounded-none",
        pill: "rounded-full",
      },
    },
    defaultVariants: { zType: "default", zShape: "default" },
  },
);

export type ZardBadgeTypeVariants = NonNullable<
  VariantProps<typeof badgeVariants>["zType"]
>;
export type ZardBadgeShapeVariants = NonNullable<
  VariantProps<typeof badgeVariants>["zShape"]
>;
```

`badge.component.ts`:

```ts
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from "@angular/core";
import type { ClassValue } from "clsx";
import { cn } from "@/lib/utils";
import {
  badgeVariants,
  type ZardBadgeShapeVariants,
  type ZardBadgeTypeVariants,
} from "./badge.variants";

@Component({
  selector: "z-badge",
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { "[class]": "classes()" },
  exportAs: "zBadge",
})
export class ZardBadgeComponent {
  readonly zType = input<ZardBadgeTypeVariants>("default");
  readonly zShape = input<ZardBadgeShapeVariants>("default");
  readonly class = input<ClassValue>("");

  protected readonly classes = computed(() =>
    cn(
      badgeVariants({ zType: this.zType(), zShape: this.zShape() }),
      this.class(),
    ),
  );
}
```

#### Example: dialog (complex component with service + ref)

Zard source files: `dialog.variants.ts`, `dialog-ref.ts`, `dialog.service.ts`, `dialog.component.ts`

Registry output at `registry-ng/vitality/ui/dialog/` — same four files, with imports rewritten:

```ts
// Before (zard-ui):
import { ZardButtonComponent } from "../button/button.component";
import { ZardIconComponent } from "../icon/icon.component";
import { mergeClasses } from "@/shared/utils/merge-classes";

// After (registry):
import { ZardButtonComponent } from "@/ui/button/button.component";
import { ZardIconComponent } from "@/ui/icon/icon.component";
import { cn } from "@/lib/utils";
```

And add `registryDependencies: ["button", "icon"]` in `registry.json`.

### 3. Registry entry format

For each component, add an entry to `registry-ng/registry.json`. List all files in the `files` array:

```json
{
  "name": "badge",
  "type": "registry:ui",
  "title": "Badge",
  "description": "A badge component with type and shape variants.",
  "dependencies": ["class-variance-authority"],
  "registryDependencies": ["utils"],
  "files": [
    {
      "path": "vitality/ui/badge/badge.variants.ts",
      "type": "registry:ui"
    },
    {
      "path": "vitality/ui/badge/badge.component.ts",
      "type": "registry:ui"
    }
  ]
}
```

For complex components, include all files:

```json
{
  "name": "dialog",
  "type": "registry:ui",
  "title": "Dialog",
  "description": "A dialog component with overlay and portal support.",
  "dependencies": ["class-variance-authority", "@angular/cdk"],
  "registryDependencies": ["utils", "button", "icon"],
  "files": [
    {
      "path": "vitality/ui/dialog/dialog.variants.ts",
      "type": "registry:ui"
    },
    {
      "path": "vitality/ui/dialog/dialog-ref.ts",
      "type": "registry:ui"
    },
    {
      "path": "vitality/ui/dialog/dialog.service.ts",
      "type": "registry:ui"
    },
    {
      "path": "vitality/ui/dialog/dialog.component.ts",
      "type": "registry:ui"
    }
  ]
}
```

### 4. Build and verify

```bash
npm run registry:build:ng
npm run dev
```

Verify: `http://localhost:3000/r/ng/<component-name>.json` returns valid JSON for each component.

## Commands

| Command                      | Description                             |
| ---------------------------- | --------------------------------------- |
| `npm install`                | Install dependencies                    |
| `npm run registry:build:ng`  | Build Angular registry JSON from source |
| `npm run registry:build:all` | Build both React and Angular registries |
| `npm run dev`                | Start dev server                        |
| `npm run build`              | Production build                        |
