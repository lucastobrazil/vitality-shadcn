# React ↔ Angular Component Alignment Analysis

React components (`registry/vitality/ui/`) are source of truth. Angular components (`registry-ng/vitality/ui/`) must align.

---

## 1. Component List Comparison

### Matched Components (31)

| React File | Angular Directory | Notes |
|---|---|---|
| accordion.tsx | accordion/ | |
| alert.tsx | alert/ | Variant axis renamed (see below) |
| alert-dialog.tsx | alert-dialog/ | |
| avatar.tsx | avatar/ | Variants diverge significantly |
| badge.tsx | badge/ | Variants diverge significantly |
| breadcrumb.tsx | breadcrumb/ | Angular has extra variants |
| button.tsx | button/ | Variants diverge (see below) |
| calendar.tsx | calendar/ | |
| card.tsx | card/ | |
| carousel.tsx | carousel/ | |
| checkbox.tsx | checkbox/ | Angular has extra variants |
| command.tsx | command/ | |
| context-menu.tsx | menu/ (context-menu) | |
| dialog.tsx | dialog/ | |
| dropdown-menu.tsx | dropdown/ | |
| form.tsx | form/ | |
| input.tsx | input/ | Variants diverge |
| input-group.tsx | input-group/ | |
| pagination.tsx | pagination/ | |
| popover.tsx | popover/ | |
| progress.tsx | progress-bar/ | Name mismatch |
| radio-group.tsx | radio/ | Name mismatch |
| resizable.tsx | resizable/ | |
| select.tsx | select/ | |
| sheet.tsx | sheet/ | |
| skeleton.tsx | skeleton/ | |
| slider.tsx | slider/ | |
| switch.tsx | switch/ | Major rewrite needed |
| table.tsx | table/ | |
| tabs.tsx | tabs/ | Architecture differs |
| toggle.tsx | toggle/ | |
| toggle-group.tsx | toggle-group/ | |
| tooltip.tsx | tooltip/ | |
| sonner.tsx (Toaster) | toast/ | Equivalent (both use ngx-sonner/sonner) |

### In React Only (14) — Angular needs these

| React File | Priority | Notes |
|---|---|---|
| **spinner.tsx** | High | Angular has `loader/` but different API — should align |
| **status-badge.tsx** | High | New Vitality component, no Angular equivalent |
| **label.tsx** | High | Standalone label component |
| **textarea.tsx** | Medium | Angular bundles textarea into `input` directive |
| **separator.tsx** | Medium | Angular has `divider/` — should rename or alias |
| aspect-ratio.tsx | Low | Simple Radix wrapper |
| chart.tsx | Low | Recharts-specific |
| collapsible.tsx | Low | Radix wrapper |
| drawer.tsx | Low | Vaul drawer |
| hover-card.tsx | Low | Radix wrapper |
| input-otp.tsx | Low | OTP input |
| menubar.tsx | Low | Radix menubar |
| navigation-menu.tsx | Low | Radix nav menu |
| scroll-area.tsx | Low | Radix scroll area |
| sidebar.tsx | Low | Complex layout component |
| use-mobile.ts | Low | React hook (not applicable) |

### In Angular Only (8) — No React equivalent

| Angular Directory | Action |
|---|---|
| button-group/ | Keep (Angular-specific composition) |
| combobox/ | Keep (combines command + popover pattern) |
| date-picker/ | Keep (combines calendar + popover) |
| divider/ | Rename to `separator` or keep as alias |
| empty/ | Keep (Angular-specific empty state) |
| icon/ | Keep (lucide-angular wrapper) |
| kbd/ | Keep (keyboard shortcut display) |
| layout/ | Keep (Angular-specific layout system) |
| segmented/ | Keep (no React equivalent yet) |

---

## 2. Variant Refactoring Spec

React is source of truth. Angular `.variants.ts` files must match React's CVA definitions. The `z` prefix on prop names (`zType` → `variant`, `zSize` → `size`) is an Angular convention to avoid HTML attribute collisions — **keep the `z` prefix** but align the variant axis names and values.

```yml
# Angular Component Alignment to React Source of Truth
# ─────────────────────────────────────────────────────
# Operation types:
#   - rename-axis: [oldName, newName]  — rename a variant axis (e.g. zType → zVariant)
#   - declare: { ... }                — replace variant values with React's definition
#   - swap: [old, new]                — replace one class string with another
#   - add: class                      — append a class
#   - remove: class                   — delete a class
#   - remove-axis: axisName           — remove a variant axis entirely
#   - add-axis: { name, values }      — add a new variant axis
#   - rewrite: true                   — full rewrite of variants file

components:

  # ── Button ──────────────────────────────────────────────────────
  - file: button/button.variants.ts
    source: button.tsx
    changes:
      - target: base
        note: >-
          React base is more minimal. Angular has extra cn() wrapper.
          Align base classes exactly.
        operations:
          - declare: >-
              inline-flex items-center justify-center gap-2 whitespace-nowrap
              rounded-md text-sm font-semibold transition-all
              active:translate-y-[0.5px]
              disabled:pointer-events-none disabled:opacity-50
              [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4
              shrink-0 [&_svg]:shrink-0 outline-none
              focus-visible:border-ring focus-visible:ring-ring/50
              focus-visible:ring-[3px]
              aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40
              aria-invalid:border-destructive

      - target: variants.zType
        note: >-
          Rename axis from zType → zVariant to match React's "variant".
          Realign variant values: React "default" = muted, React "primary" = bg-primary.
          Angular currently has "default" = bg-primary (wrong).
          Add "primary" variant, rename current "default" semantics.
          Remove "secondary" (not in React).
        rename-axis: [zType, zVariant]
        declare:
          default: "bg-muted text-foreground border hover:bg-muted-foreground/15"
          primary: "bg-primary text-primary-foreground hover:bg-primary/90"
          destructive: >-
            bg-destructive text-white hover:bg-destructive/90
            focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40
            dark:bg-destructive/60
          outline: >-
            border bg-background shadow-xs hover:bg-accent
            hover:text-accent-foreground dark:bg-input/30
            dark:border-input dark:hover:bg-input/50
          ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-accent/50"
          link: "text-primary underline-offset-4 hover:underline"
        default-variant: default

      - target: variants.zSize
        rename-axis: [zSize, zSize]  # keep name
        declare:
          default: "h-8 px-4 py-2 has-[>svg]:px-3"
          xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3"
          sm: "h-7 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5"
          lg: "h-9 rounded-md px-6 has-[>svg]:px-4"
          icon: "size-8"
          icon-xs: "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3"
          icon-sm: "size-7"
          icon-lg: "size-9"

      - target: variants.zShape
        note: React has no shape variant. Keep for Angular (extra feature).

      - target: variants.zFull
        note: React has no zFull. Keep for Angular (extra feature).

      - target: variants.zLoading
        note: React has no zLoading. Keep for Angular (extra feature).

      - target: variants.zDisabled
        note: React has no zDisabled. Keep for Angular (extra feature).

  # ── Alert ──────────────────────────────────────────────────────
  - file: alert/alert.variants.ts
    source: alert.tsx
    changes:
      - target: variants.zType
        note: >-
          React uses "severity" axis with 6 values (muted, destructive, warning,
          success, info, brand) plus "size" axis (default, compact, blockCompact).
          Angular only has zType: default|destructive. Full rewrite needed.
        rename-axis: [zType, zSeverity]
        declare:
          muted: "text-foreground bg-muted [&>svg]:text-foreground"
          destructive: "text-destructive bg-destructive/10 [&>svg]:text-destructive"
          warning: "text-warning bg-warning/10 [&>svg]:text-warning"
          success: "text-success bg-success/10 [&>svg]:text-success"
          info: "text-info bg-info/10 [&>svg]:text-info"
          brand: "text-brand bg-brand/10 [&>svg]:text-brand"
        default-variant: muted

      - target: base
        operations:
          - remove: border
          - remove: "flex items-center gap-3"
          - add: "grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current"

      - target: add-axis
        add-axis:
          name: zSize
          values:
            default: "px-4 py-3 text-sm"
            compact: "px-0 py-0 bg-transparent! border-transparent! text-xs flex items-center gap-1 [&>svg]:translate-y-0 [&>svg]:shrink-0"
            blockCompact: "px-3 py-2 text-sm flex! gap-x-1!"

      - target: alertTitleVariants
        declare:
          base: "col-start-2 min-h-4 font-semibold"

      - target: alertDescriptionVariants
        note: Remove per-type variants, use single class string
        declare:
          base: >-
            text-muted-foreground col-start-2 grid justify-items-start gap-1
            text-sm [&_p]:leading-relaxed
            [[data-size=blockCompact]_&]:col-auto
            [[data-size=blockCompact]_&]:inline

      - target: add-subcomponent
        note: Add AlertAction sub-component
        add:
          name: alertActionVariants
          base: "absolute top-2 right-2"

  # ── Badge ──────────────────────────────────────────────────────
  - file: badge/badge.variants.ts
    source: badge.tsx
    changes:
      - target: base
        operations:
          - swap: [px-2, px-1.5]
          - add: "h-5 min-w-5"
          - swap: [rounded-md, rounded-full]  # React uses rounded-full

      - target: variants.zType
        rename-axis: [zType, zVariant]
        note: >-
          React only has 2 variants: default + neutral.
          Remove primary, destructive, outline.
          Remove border-transparent (React uses border-transparent in base).
        declare:
          default: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90"
          neutral: "bg-foreground/70 text-muted [a&]:hover:bg-foreground/90"
        default-variant: default

      - target: variants.zShape
        note: React has no shape variant (always rounded-full). Remove.
        remove-axis: zShape

  # ── Avatar ─────────────────────────────────────────────────────
  - file: avatar/avatar.variants.ts
    source: avatar.tsx
    changes:
      - target: base
        note: React base is simpler, uses overflow-hidden and select-none
        declare: >-
          group/avatar relative flex shrink-0 overflow-hidden
          rounded-full select-none

      - target: variants.zSize
        rename-axis: [zSize, zSize]
        note: >-
          React sizes: sm=size-6, default=size-8, lg=size-10.
          Angular has sm=size-8, default=size-10, md/lg/xl extras.
          Align to React scale.
        declare:
          default: "size-8"
          sm: "size-6"
          lg: "size-10"

      - target: variants.zShape
        note: React has no shape variant (always rounded-full). Remove.
        remove-axis: zShape

      - target: add-axis
        add-axis:
          name: zVariant
          values:
            neutral: "bg-muted text-foreground"
            primary: "bg-primary text-primary-foreground"
          default: neutral

      - target: avatarFallbackVariants
        note: Add variant support to fallback
        declare:
          base: >-
            flex size-full items-center justify-center rounded-full text-sm
            group-data-[size=sm]/avatar:text-xs
          variants:
            zVariant:
              neutral: "bg-muted text-foreground"
              primary: "bg-primary text-primary-foreground"

  # ── Input ──────────────────────────────────────────────────────
  - file: input/input.variants.ts
    source: input.tsx
    changes:
      - target: variants.zType.default
        note: Align with React's single input class string
        operations:
          - swap: [h-9, h-8]
          - swap: [bg-transparent, bg-background]
          - swap: ["focus-visible:ring-[3px]", "focus-visible:ring-1"]
          - swap: ["focus-visible:ring-ring/50", "focus-visible:ring-ring"]
          - add: "hover:bg-muted/50"
          - add: "selection:bg-primary selection:text-primary-foreground"

  # ── Switch ─────────────────────────────────────────────────────
  - file: switch/switch.variants.ts
    source: switch.tsx
    rewrite: true
    note: >-
      React switch is completely different: h-[1.25rem] w-9, uses Check/X icons,
      absolute-positioned thumb, justify-start/end for icon placement.
      Angular uses h-6 w-11, simple sliding thumb, no icons.
      Full rewrite of variants AND component template.
    declare:
      root: >-
        peer inline-flex h-[1.25rem] w-9 relative px-0.5 shrink-0 items-center
        rounded-full border border-transparent shadow-xs transition-all outline-none
        focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
        disabled:cursor-not-allowed disabled:opacity-50
        data-[state=checked]:bg-primary data-[state=unchecked]:bg-foreground/50
        dark:data-[state=unchecked]:bg-foreground/30
        data-[state=checked]:justify-start data-[state=unchecked]:justify-end
        [&_svg:not([class*='size-'])]:size-3
        [&_svg:not([class*='text-'])]:text-primary-foreground
      thumb: >-
        bg-background pointer-events-none block size-4 rounded-full ring-0
        transition-transform
        data-[state=checked]:translate-x-[calc(100%+1px)]
        data-[state=unchecked]:translate-x-0 absolute left-[1px]
    remove-axis: [zType, zSize]
    note-component: >-
      Component template must also render Check/X icons from lucide-angular.
      Remove zSize/zType inputs. Remove CVA variants (single style now).

  # ── Toggle ─────────────────────────────────────────────────────
  - file: toggle/toggle.variants.ts
    source: toggle.tsx
    changes:
      - target: variants.zType
        rename-axis: [zType, zVariant]

      - target: variants.zSize
        rename-axis: [zSize, zSize]
        declare:
          default: "h-9 px-2 min-w-9"
          sm: "h-8 px-1.5 min-w-8"
          lg: "h-10 px-2.5 min-w-10"

      - target: base
        note: Align base with React (add shadow-xs to outline, focus ring style)
        operations:
          - remove: "ring-offset-background"
          - remove: "focus-visible:ring-offset-2"
          - swap: ["focus-visible:ring-2", "focus-visible:ring-[3px]"]
          - add: "focus-visible:border-ring focus-visible:ring-ring/50"
          - add: "outline-none transition-[color,box-shadow]"
          - add: "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          - add: "whitespace-nowrap"

  # ── Tabs ───────────────────────────────────────────────────────
  - file: tabs/tabs.variants.ts
    source: tabs.tsx
    rewrite: true
    note: >-
      React uses Radix TabsPrimitive with data-slot pattern, CVA for TabsList
      variant (default/line), and complex CSS for active indicator.
      Angular uses custom implementation with zPosition, zActivePosition, etc.
      Architecture is fundamentally different — keep Angular structure but align
      the visual output (active color, tab trigger styling).
    changes:
      - target: tabButtonVariants
        note: Active tab indicator should use primary color (not just border)
        operations:
          - swap: [border-t-primary, border-t-primary]  # already correct
          - note: "Ensure active text uses text-primary (not text-foreground)"

  # ── Checkbox ───────────────────────────────────────────────────
  - file: checkbox/checkbox.variants.ts
    source: checkbox.tsx
    changes:
      - target: base
        operations:
          - add: "hover:border-ring"
          - add: "dark:bg-input/30"
          - swap: [rounded, "rounded-[4px]"]
          - add: "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          - add: "data-[state=checked]:border-primary"

      - target: variants.zType
        note: React has no type variant. Remove or keep as Angular extra.

  # ── Radio ──────────────────────────────────────────────────────
  - file: radio/radio.variants.ts
    source: radio-group.tsx
    changes:
      - target: base
        operations:
          - swap: [border, border-2]
          - add: "data-[state=checked]:border-primary"
          - add: "data-[state=unchecked]:enabled:hover:border-foreground/20"

  # ── Progress Bar ───────────────────────────────────────────────
  - file: progress-bar/progress-bar.variants.ts
    source: progress.tsx
    changes:
      - target: containerProgressBarVariants (track)
        operations:
          - swap: [bg-primary/20, bg-foreground/10]

  # ── Breadcrumb ─────────────────────────────────────────────────
  - file: breadcrumb/breadcrumb.variants.ts
    source: breadcrumb.tsx
    changes:
      - target: breadcrumbItemVariants
        note: React BreadcrumbLink uses text-primary, not hover:text-foreground
        operations:
          - swap: [hover:text-foreground, hover:text-primary/80]
          - add: "text-primary"

      - target: note
        note: >-
          React has BreadcrumbPage with "text-foreground font-normal".
          Ensure Angular's last-item styling matches.

  # ── Separator / Divider ────────────────────────────────────────
  - file: divider/divider.variants.ts
    source: separator.tsx
    changes:
      - target: base
        note: >-
          React separator is simpler (no spacing variants).
          Keep Angular's extra zSpacing variants as-is.
          Align base classes.
        operations:
          - add: "shrink-0"

  # ── Loader / Spinner ───────────────────────────────────────────
  - file: loader/loader.variants.ts
    source: spinner.tsx
    changes:
      - target: base
        operations:
          - add: "animate-spin"

      - target: add-axis
        add-axis:
          name: zColor
          values:
            default: "text-muted-foreground"
            primary: "text-primary"
            secondary: "text-secondary"
          default: default

      - target: variants.zSize
        declare:
          sm: "size-4"
          default: "size-6"
          lg: "size-8"
          xl: "size-12"

  # ── Sheet ──────────────────────────────────────────────────────
  - file: sheet/sheet.variants.ts
    source: sheet.tsx
    changes:
      - target: note
        note: >-
          Angular sheet variants already closely match React.
          Main difference: Angular has zSize compound variants (sm/lg),
          React hardcodes "w-3/4 sm:max-w-sm". Keep Angular's richer API.

  # ── Dropdown ───────────────────────────────────────────────────
  - file: dropdown/dropdown.variants.ts
    source: dropdown-menu.tsx
    changes:
      - target: dropdownItemVariants
        note: Already aligned. Verify destructive variant matches React exactly.

  # ── Menu (Context Menu) ────────────────────────────────────────
  - file: menu/menu.variants.ts
    source: context-menu.tsx
    changes:
      - target: note
        note: Already closely aligned. No variant changes needed.

  # ── Select ─────────────────────────────────────────────────────
  - file: select/select.variants.ts
    source: select.tsx
    changes:
      - target: selectTriggerVariants
        operations:
          - swap: [min-h-9, h-8]  # React uses h-8
          - remove: shadow-xs
          - swap: ["focus-visible:ring-[3px]", "focus-visible:ring-1"]  # React uses ring-1 not ring-[3px]
          - swap: ["focus-visible:ring-ring/50", "focus-visible:ring-ring"]
          - add: "hover:bg-muted/50"
```

---

## 3. Other Angular Component Changes

Beyond variant alignment, these structural changes are needed:

### Prop Naming Convention

The `z` prefix stays (Angular convention), but the axis names should align:

| Current Angular | Target Angular | React Equivalent |
|---|---|---|
| `zType` (on button, alert, badge) | `zVariant` | `variant` |
| `zType` (on input, checkbox) | keep `zType` or `zVariant` | n/a (no CVA variant) |
| `zSize` | `zSize` | `size` |
| `zShape` | keep if no React equiv | n/a |

**Decision needed**: Rename `zType` → `zVariant` across all components that use it as a style variant axis? This is a breaking API change for Angular consumers.

### New Components to Create

1. **`spinner/`** — Port React's `spinner.tsx` (Loader2Icon + CVA with size/color variants). Could replace or wrap existing `loader/`.
2. **`status-badge/`** — Port React's `status-badge.tsx` (CVA with color/severity variants). New component.
3. **`label/`** — Port React's `label.tsx` as a standalone component/directive.

### Components Needing Template Changes (not just variants)

| Component | Change |
|---|---|
| **switch** | Full template rewrite: add Check/X icons from lucide-angular, change to absolute-positioned thumb, remove zSize/zType inputs |
| **alert** | Template restructure: change from flex to grid layout, add `data-severity`/`data-size` attributes, add AlertAction sub-component |
| **avatar** | Remove zShape input, add zVariant input, simplify size scale, pass variant to fallback |
| **badge** | Remove zShape input, simplify to 2 variants |
| **tabs** | Ensure active tab text uses `text-primary` (not `text-foreground`) |

### globals.css / styles.css

The Angular Storybook `styles.css` is missing these CSS variables that React's `globals.css` has:

```css
--header, --header-foreground
--footer, --footer-foreground
--code, --code-foreground, --code-highlight, --code-number, --code-selection, --code-border
```

Add these to `registry-ng/.storybook/styles.css` `:root` and `.dark` blocks.

---

## 4. Storybook Story Changes

After variant alignment, every story that references changed prop names or values must be updated.

### Stories Requiring Updates

| Story File | Changes |
|---|---|
| `button/button.stories.ts` | `zType` → `zVariant`, remove `secondary`, add `primary`, update argTypes options, update all template bindings |
| `alert/alert.stories.ts` | `zType` → `zSeverity`, add `zSize` arg, add stories for warning/success/info/brand/compact/blockCompact, add AlertAction story |
| `badge/badge.stories.ts` | `zType` → `zVariant`, remove primary/destructive/outline stories, add neutral story, remove zShape |
| `avatar/avatar.stories.ts` | Remove zShape argType, add zVariant argType (neutral/primary), update size options to sm/default/lg only |
| `switch/switch.stories.ts` | Remove zType/zSize argTypes (no variants anymore), update template for new icon-based design |
| `input/input.stories.ts` | Update Default story args if height/focus ring changed |
| `checkbox/checkbox.stories.ts` | Add hover:border-ring visual, may remove zType stories |
| `radio/radio.stories.ts` | Update for border-2 styling |
| `toggle/toggle.stories.ts` | `zType` → `zVariant`, update zSize options (sm/default/lg, remove md) |
| `progress-bar/progress-bar.stories.ts` | Track color changes (bg-primary/20 → bg-foreground/10) |
| `breadcrumb/breadcrumb.stories.ts` | Link color now text-primary |
| `loader/loader.stories.ts` | Add zColor argType, add xl size, add animate-spin to base |
| `select/select.stories.ts` | Trigger height and focus ring changes |
| `tabs/tabs.stories.ts` | Active tab text color to text-primary |

### New Stories to Create

| Story File | For Component |
|---|---|
| `spinner/spinner.stories.ts` | New spinner component (if created separately from loader) |
| `status-badge/status-badge.stories.ts` | New status-badge component |
| `label/label.stories.ts` | New label component |

### Story Pattern Note

All stories using `zType` as an argType name should be updated to `zVariant` where the axis was renamed. The `control: "select"` options arrays must match the new variant value lists.
