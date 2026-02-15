# Write Storybook Stories for All Components

Write a `.stories.ts` file for every component in `registry-ng/vitality/ui/` that does not already have one.

## Pre-flight

1. List all directories under `registry-ng/vitality/ui/`
2. Glob for `registry-ng/vitality/ui/**/*.stories.ts` to find which stories already exist
3. The difference is your work list

## How to write each story

For EACH component that needs a story:

1. **Read the component source files** — glob `registry-ng/vitality/ui/{component}/*.ts` and read every file. You need:
   - The selector (e.g. `z-alert`, `[z-button]`, `input[z-input]`)
   - All `input()` / `@Input()` declarations and their types/defaults
   - Whether it's a component, directive, or service
   - Any sub-components in the same directory that you'll need in the template
   - Any re-exports from the same file (some files export multiple components)

2. **Classify the component** into one of the patterns below and write the story accordingly.

3. **Create the file** at `registry-ng/vitality/ui/{component}/{component}.stories.ts`

## Pattern 1: Simple standalone component

For components with a custom element selector and simple inputs.

```typescript
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardAlertComponent } from "./alert.component";

const meta: Meta<ZardAlertComponent> = {
  title: "UI/Alert",
  component: ZardAlertComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardAlertComponent],
    }),
  ],
  argTypes: {
    zType: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardAlertComponent>;

// Default: interactive with args
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-alert [zType]="zType" zTitle="Heads up!" zDescription="You can add components."></z-alert>`,
  }),
  args: {
    zType: "default",
  },
};

// Showcase: static template, no args
export const Destructive: Story = {
  render: () => ({
    template: `<z-alert zType="destructive" zTitle="Error" zDescription="Session expired."></z-alert>`,
  }),
};
```

**Used for:** alert, avatar, badge, button, button-group, card, checkbox, divider, empty, kbd, loader, progress-bar, radio, segmented, skeleton, slider, switch, toggle, toggle-group

## Pattern 2: Compound component (multiple sub-components)

When a component has child components that must also be imported.

```typescript
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardAccordionComponent } from "./accordion.component";
import { ZardAccordionItemComponent } from "./accordion-item.component";

const meta: Meta<ZardAccordionComponent> = {
  title: "UI/Accordion",
  component: ZardAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardAccordionComponent, ZardAccordionItemComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardAccordionComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <z-accordion zType="single" [zCollapsible]="true">
        <z-accordion-item zValue="item-1" zTitle="First">Content 1</z-accordion-item>
        <z-accordion-item zValue="item-2" zTitle="Second">Content 2</z-accordion-item>
      </z-accordion>
    `,
  }),
};
```

**Used for:** accordion, breadcrumb, calendar, carousel, form, input-group, layout, pagination, resizable, select, table, tabs

**Key rule:** import EVERY sub-component/directive used in the template into `moduleMetadata.imports`.

## Pattern 3: Directive on host element

When the component is a directive applied as an attribute.

```typescript
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardInputDirective } from "./input.directive";

const meta: Meta<ZardInputDirective> = {
  title: "UI/Input",
  component: ZardInputDirective,
  decorators: [
    moduleMetadata({
      imports: [ZardInputDirective],
    }),
  ],
  argTypes: {
    zSize: { control: "select", options: ["default", "sm", "lg"] },
  },
};

export default meta;
type Story = StoryObj<ZardInputDirective>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<input z-input placeholder="Enter text..." [zSize]="zSize" />`,
  }),
  args: { zSize: "default" },
};
```

**Used for:** input (directive on `<input>`/`<textarea>`), button (directive on `<button>`), table sub-components (directives on `<table>`, `<thead>`, etc.)

## Pattern 4: CDK overlay (tooltip, popover, dropdown, menu)

Directives that create overlays. Use static templates with trigger elements.

```typescript
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardTooltipDirective, ZardTooltipComponent } from "./tooltip";

const meta: Meta<ZardTooltipDirective> = {
  title: "UI/Tooltip",
  component: ZardTooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [ZardTooltipDirective, ZardTooltipComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardTooltipDirective>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 80px;">
        <button zTooltip="This is a tooltip" zTrigger="hover"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;">
          Hover me
        </button>
      </div>
    `,
  }),
};
```

**Important:** Add generous padding (80-120px) around overlay triggers so the overlay has room to render.

**Used for:** tooltip, popover, dropdown, menu, context-menu

## Pattern 5: Service-based (dialog, sheet, alert-dialog)

Components opened via an injected service. Create an inline `@Component` wrapper.

```typescript
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { Component, inject } from "@angular/core";
import { ZardDialogService } from "./dialog.service";
import { ZardButtonComponent } from "@/ui/button/button.component";

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

**Used for:** dialog, sheet, alert-dialog

**For multiple stories** (e.g. sheet sides), create multiple wrapper components, import all in `moduleMetadata`, and render each via `template: '<story-sheet-right></story-sheet-right>'`.

## Pattern 6: Toast (ngx-sonner)

Toast uses the `toast()` function from `ngx-sonner` plus a `<z-toaster>` component in the template.

```typescript
import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { Component } from "@angular/core";
import { toast } from "ngx-sonner";
import { ZardToastComponent } from "./toast.component";
import { ZardButtonComponent } from "@/ui/button/button.component";

@Component({
  selector: "story-toast-default",
  standalone: true,
  imports: [ZardToastComponent, ZardButtonComponent],
  template: `
    <z-toaster />
    <button z-button (click)="showToast()">Show Toast</button>
  `,
})
class StoryToastDefaultComponent {
  showToast() {
    toast("Event has been created.");
  }
}

const meta: Meta = {
  title: "UI/Toast",
  decorators: [
    moduleMetadata({
      imports: [StoryToastDefaultComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `<story-toast-default></story-toast-default>`,
  }),
};
```

## Pattern 7: Router-dependent (breadcrumb)

Add `applicationConfig` decorator with `provideRouter([])`.

```typescript
import { applicationConfig, moduleMetadata } from "@storybook/angular";
import { provideRouter } from "@angular/router";

const meta: Meta<ZardBreadcrumbComponent> = {
  title: "UI/Breadcrumb",
  component: ZardBreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardBreadcrumbComponent, ZardBreadcrumbItemComponent, ZardBreadcrumbEllipsisComponent],
    }),
    applicationConfig({ providers: [provideRouter([])] }),
  ],
};
```

## Rules

- **Always read source files first.** Never guess selectors, input names, or APIs.
- **Import everything used in the template** into `moduleMetadata.imports`.
- **Use exact selectors** from the component source. Some use element selectors (`z-alert`), some use attribute selectors (`[z-button]`, `input[z-input]`).
- **Path aliases:** Use `@/ui/...` for cross-component imports (e.g. `import { ZardButtonComponent } from "@/ui/button/button.component"`). Use relative imports (`./`) for same-directory imports.
- **No barrel files.** Import directly from the `.component.ts` or `.directive.ts` file.
- **No modifications to existing files.** Only create new `.stories.ts` files.
- **Title format:** `"UI/ComponentName"` in PascalCase (e.g. `"UI/ButtonGroup"`, `"UI/ProgressBar"`, `"UI/ContextMenu"`).
- **argTypes:** Add `control: "select"` for string union inputs. Add `control: "boolean"` for boolean inputs. Add `control: { type: "range", min, max }` for numeric inputs.
- **Default story:** Should use `args` for interactive Storybook controls.
- **Showcase stories:** Static templates demonstrating variants/states. Use flex/grid layouts with 8px gaps.
- **context-menu** lives in `menu/context-menu.stories.ts` (not its own directory).

## Story suggestions per component type

| Type | Suggested stories |
|------|-------------------|
| Visual variants (zType) | Default + Variants grid |
| Size options (zSize) | Sizes side-by-side |
| States (disabled, loading) | Disabled, Loading |
| Form control (CVA) | Default, Disabled |
| Overlay | Default trigger, Positions/Placements |
| Service-based | Default (open on button click) |
| Composition | Default (assembled layout) |

## Execution strategy

1. Launch parallel agents, each handling 4-7 stories grouped by pattern similarity
2. Each agent reads component sources, then writes all its story files
3. After all agents complete, run `npm run storybook:build` (via `npx ng run registry-ng:build-storybook`) to catch compilation errors
4. Fix any errors (usually wrong import paths or missing imports)
5. Final check: `npm run storybook` to visually verify

## Config (already set up, do not modify)

- Stories glob: `registry-ng/.storybook/main.ts` → `"../vitality/ui/**/*.stories.ts"`
- TypeScript: `registry-ng/.storybook/tsconfig.json` → `include: ["../vitality/**/*.ts"]`
- Path aliases: `@/lib/*` → `vitality/lib/*`, `@/ui/*` → `vitality/ui/*`
- Styles: loaded via `angular.json`, not CSS imports
- Theme: light/dark via `withThemeByClassName` in `preview.ts`
