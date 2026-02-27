# Testing Patterns

**Analysis Date:** 2026-02-25

## Test Framework

**Runner:**
- No unit/integration test framework is configured
- No `jest.config.*`, `vitest.config.*`, `karma.conf.*`, `cypress.config.*`, or `playwright.config.*` files exist
- No `.test.*` or `.spec.*` files exist anywhere in the codebase

**Visual Testing:**
- Storybook 10.x is used as the sole testing/verification tool
- Framework: `@storybook/angular` ^10.2.8
- Config: `registry-ng/.storybook/main.ts`
- Preview: `registry-ng/.storybook/preview.ts`
- Only Angular components have Storybook stories; React components have no automated testing

**Run Commands:**
```bash
npm run storybook            # Start Storybook dev server (port 6006)
npm run storybook:build      # Build static Storybook site to storybook-static/
npm run lint                 # ESLint (Next.js config only, does not cover Angular)
```

## Storybook Story Organization

**Location:**
- Co-located with Angular components: `registry-ng/vitality/ui/{component}/{component}.stories.ts`
- Every Angular UI component has a corresponding `.stories.ts` file (46 story files total)

**Naming:**
- Files: `{component-name}.stories.ts` (kebab-case, matching component directory)
- Exception: menu has two story files: `menu.stories.ts` and `context-menu.stories.ts`

**Coverage:** All 44+ Angular components in `registry-ng/vitality/ui/` have story files

## Story Structure

**Standard Pattern (simple components):**

```typescript
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardBadgeComponent } from "./badge.component";

const meta: Meta<ZardBadgeComponent> = {
  title: "UI/Badge",                           // Always "UI/{ComponentName}"
  component: ZardBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardBadgeComponent],           // Import the component
    }),
  ],
  argTypes: {
    zVariant: {                                // Map inputs to Storybook controls
      control: "select",
      options: ["default", "neutral"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardBadgeComponent>;

// Default story with args
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-badge [zVariant]="zVariant">Badge</z-badge>`,
  }),
  args: {
    zVariant: "default",
  },
};

// Variant showcase story (no args, shows all variants)
export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <z-badge zVariant="default">Default</z-badge>
        <z-badge zVariant="neutral">Neutral</z-badge>
      </div>
    `,
  }),
};
```

**Pattern for service-based components (Dialog, Sheet):**

```typescript
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { Component, inject } from "@angular/core";

import { ZardDialogService } from "./dialog.service";
import { ZardButtonComponent } from "@/ui/button/button.component";

// Create a wrapper component for interactive stories
@Component({
  selector: "story-dialog-default",
  standalone: true,
  imports: [ZardButtonComponent],
  template: `<button z-button (click)="open()">Open Dialog</button>`,
})
class StoryDialogDefaultComponent {
  private readonly dialogService = inject(ZardDialogService);

  open() {
    this.dialogService.create({
      zTitle: "Edit Profile",
      zDescription: "Make changes to your profile here.",
      zContent: "<p>Your profile content goes here.</p>",
      zOkText: "Save changes",
      zCancelText: "Cancel",
    });
  }
}

const meta: Meta<StoryDialogDefaultComponent> = {
  title: "UI/Dialog",
  component: StoryDialogDefaultComponent,
  decorators: [
    moduleMetadata({
      imports: [StoryDialogDefaultComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<StoryDialogDefaultComponent>;

export const Default: Story = {};
```

## Story Conventions

**Story naming:**
- `Default` - Primary story with configurable args
- `Variants` - Shows all visual variants side-by-side
- `Sizes` - Shows all size options
- `Loading` - Shows loading states
- `Disabled` - Shows disabled states
- Named by feature/state in PascalCase

**Layout pattern for variant showcases:**
```html
<div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
  <!-- variants here -->
</div>
```

**argTypes mapping:** Map `z`-prefixed Angular inputs to Storybook controls using `control: "select"` with explicit `options` arrays.

**moduleMetadata:** Always import the component-under-test and any dependencies via the `moduleMetadata` decorator.

## Storybook Configuration

**Main config (`registry-ng/.storybook/main.ts`):**
- Stories glob: `../vitality/ui/**/*.stories.ts`
- Docs pages: `./docs/**/*.mdx`
- Uses `tsconfig-paths-webpack-plugin` for `@/lib/*` and `@/ui/*` path aliases
- `@storybook/addon-styling-webpack` handles Tailwind CSS via PostCSS
- Custom webpack rule excludes Angular component styles (`?ngResource`) from addon CSS processing

**Preview config (`registry-ng/.storybook/preview.ts`):**
- Dark mode via `withThemeByClassName` (class-based, matches Next.js theme approach)
- Auto-generated docs via `tags: ['autodocs']`
- Custom docs page component

**TSConfig (`registry-ng/.storybook/tsconfig.json`):**
- Strict mode, ES2022 target
- Path aliases: `@/lib/*` -> `vitality/lib/*`, `@/ui/*` -> `vitality/ui/*`
- Includes all `../vitality/**/*.ts` files

## React Component Testing

**Current state:** No testing exists for React components.

**Visual verification:** React components are demonstrated via the Next.js demo site:
- Demo pages at `src/app/_demos/{slug}.tsx`
- Live previews rendered in `src/app/components/[slug]/page.tsx`
- Manual visual inspection only

## Linting

**ESLint:**
- Config: `eslint.config.mjs`
- Extends: `eslint-config-next/core-web-vitals`, `eslint-config-next/typescript`
- Scope: Next.js/React files only (ignores `.next/`, `out/`, `build/`)
- Does NOT lint Angular files in `registry-ng/`

**Run:**
```bash
npm run lint
```

## Coverage

**Requirements:** None enforced. No coverage tooling configured.

## What to Mock (if tests are added)

**Angular components:**
- `@angular/cdk/overlay` - Mock `Overlay`, `OverlayPositionBuilder`, `OverlayRef` for components using overlays (Dialog, Dropdown, Select, Tooltip, Popover, Sheet)
- `PLATFORM_ID` - Mock as `'browser'` or `'server'` to test SSR safety
- `ElementRef` - Mock `nativeElement` for components that read DOM properties

**React components:**
- `next/navigation` - Mock `usePathname` for sidebar active state
- `next-themes` - Mock `ThemeProvider` for theme toggle
- `window.matchMedia` - Mock for `useIsMobile` hook
- `document.cookie` - Mock for sidebar state persistence

## Test Types

**Unit Tests:**
- Not implemented. If added, focus on:
  - CVA variant functions (pure functions, easy to test)
  - `cn()` utility
  - Angular services (DialogService, SheetService)
  - ControlValueAccessor implementations

**Integration Tests:**
- Not implemented. If added, focus on:
  - Angular overlay lifecycle (open/close/dispose)
  - Keyboard navigation (dropdown, select, accordion)
  - Form integration (ControlValueAccessor)

**E2E Tests:**
- Not implemented

**Visual Regression:**
- Storybook could support visual regression via addons (not currently configured)

## Adding Tests

**If adding Angular unit tests:**
1. Install: `@angular/testing`, `karma` or `jest` with `jest-preset-angular`
2. Place test files co-located: `registry-ng/vitality/ui/{component}/{component}.component.spec.ts`
3. Name: `{component-name}.component.spec.ts`
4. Use `TestBed` for component tests
5. Follow the signal-based input pattern (use `componentRef.setInput('zVariant', 'primary')`)

**If adding React tests:**
1. Install: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`
2. Place test files co-located: `registry/vitality/ui/{component}.test.tsx`
3. Test variant output, className merging, asChild behavior

---

*Testing analysis: 2026-02-25*
