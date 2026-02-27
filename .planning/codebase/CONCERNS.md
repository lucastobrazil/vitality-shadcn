# Codebase Concerns

**Analysis Date:** 2026-02-25

## Tech Debt

**React/Angular Variant Misalignment (Partially Resolved):**
- Issue: Angular components were ported from zard-ui with different variant names and values than the React source-of-truth components. A comprehensive alignment spec exists in `COMPONENT-ALIGNMENT.md` but has only been partially applied.
- Files: `COMPONENT-ALIGNMENT.md`, all files under `registry-ng/vitality/ui/*/` variant files
- Impact: Consumers switching between React and Angular registries encounter inconsistent APIs (e.g., `zType` vs `zVariant`, different variant values for the same visual). Some components like badge (`registry-ng/vitality/ui/badge/badge.variants.ts`) and button (`registry-ng/vitality/ui/button/button.variants.ts`) are already aligned. Others like switch, alert, avatar, and tabs still need alignment per the spec.
- Fix approach: Execute the remaining changes specified in `COMPONENT-ALIGNMENT.md` sections for switch (full rewrite), alert (grid layout + severity axis), avatar (remove zShape, add zVariant), and tabs (active text color).

**Angular Components Missing from React Registry (and Vice Versa):**
- Issue: The React registry has 50 components; the Angular registry has 47. There is significant divergence: 14 React-only components and 8 Angular-only components with different naming conventions for equivalent components (e.g., `dropdown-menu` vs `dropdown`, `progress` vs `progress-bar`, `radio-group` vs `radio`, `separator` vs `divider`, `sonner` vs `toast`).
- Files: `registry/vitality/ui/`, `registry-ng/vitality/ui/`
- Impact: Feature parity gap between registries. Angular consumers lack components like spinner, status-badge, label, textarea, aspect-ratio, chart, collapsible, drawer, hover-card, input-otp, menubar, navigation-menu, scroll-area, and sidebar.
- Fix approach: Prioritize porting high-priority missing Angular components (spinner, status-badge, label) as documented in `COMPONENT-ALIGNMENT.md`. Consider renaming Angular components to match React naming.

**Inconsistent Barrel File (index.ts) Usage:**
- Issue: Only 6 of 47 Angular component directories have barrel `index.ts` files: `calendar`, `empty`, `popover`, `button`, `command`, `icon`. The remaining 41 directories have no barrel exports. This was intentional per `SCAFFOLD.md` but is inconsistently applied.
- Files: `registry-ng/vitality/ui/calendar/index.ts`, `registry-ng/vitality/ui/button/index.ts`, `registry-ng/vitality/ui/command/index.ts`, `registry-ng/vitality/ui/empty/index.ts`, `registry-ng/vitality/ui/popover/index.ts`, `registry-ng/vitality/ui/icon/index.ts`
- Impact: Consumers importing components from directories with barrels use different import paths than those without. Some internal components already rely on barrel imports (e.g., combobox imports from `@/ui/button`).
- Fix approach: Either add barrel files to all directories or remove them from the 6 that have them. Consistency is more important than which approach is chosen.

**Debug Log Committed to Repository:**
- Issue: `debug-storybook.log` is tracked by git. It contains a stale Storybook build error from a previous repo path (`vitality-shad`). This is development debris that should not be in version control.
- Files: `debug-storybook.log`
- Impact: Repository pollution, confusing for contributors. The log references an old error that has already been resolved.
- Fix approach: Delete the file and add `debug-storybook.log` and `*.log` to `.gitignore`.

**Internal Documentation Committed to Repository:**
- Issue: `COMPONENT-ALIGNMENT.md` and `SCAFFOLD.md` are internal planning/development docs tracked in git. While useful during development, they are not user-facing docs.
- Files: `COMPONENT-ALIGNMENT.md`, `SCAFFOLD.md`
- Impact: Minor. Adds noise to the repository root. Could confuse external contributors.
- Fix approach: Move to `.planning/` or a `docs/internal/` directory if they should be preserved. Alternatively, keep in root but add to a README explaining their purpose.

## Known Bugs

**Alert-Dialog, Sheet, Dialog Subscriptions Without Cleanup Guard:**
- Symptoms: In `ZardAlertDialogRef`, `ZardSheetRef`, and `ZardDialogRef`, subscriptions to `cancelTriggered` and `okTriggered` EventEmitters are created in the constructor without `takeUntil(this.destroy$)`.
- Files: `registry-ng/vitality/ui/alert-dialog/alert-dialog-ref.ts` (lines 20-21), `registry-ng/vitality/ui/dialog/dialog-ref.ts` (lines 26-27), `registry-ng/vitality/ui/sheet/sheet-ref.ts` (lines 26-27)
- Trigger: These subscriptions survive until the component is destroyed, which normally happens via `close()`. If `close()` is never called (e.g., parent component destroys without closing), subscriptions leak.
- Workaround: The `close()` method does call `destroy$.next()` and `destroy$.complete()` which cleans up other subscriptions, but the `cancelTriggered`/`okTriggered` subscriptions are not piped through `takeUntil(destroy$)`.

## Security Considerations

**No Sensitive Data Exposure Risk:**
- Risk: This is a static component registry site with no backend, no authentication, and no user data. The `.env*` pattern is properly gitignored. The only environment variable referenced is `NEXT_PUBLIC_BASE_PATH` (public by design) and `NEXT_PUBLIC_REGISTRY_URL` (also public).
- Files: `next.config.ts`, `registry-ng/.storybook/main.ts`
- Current mitigation: `.gitignore` excludes `.env*` files. No secrets in committed code.
- Recommendations: None critical. The current setup is appropriate for a static documentation site.

## Performance Bottlenecks

**Large Angular Select Component (632 lines):**
- Problem: `select.component.ts` is the largest single component file at 632 lines, containing overlay management, keyboard navigation, multi-select logic, compact mode width detection, and ControlValueAccessor implementation all in one file.
- Files: `registry-ng/vitality/ui/select/select.component.ts`
- Cause: All concerns (overlay positioning, focus management, keyboard handling, value management, template rendering) are in a single component class.
- Improvement path: Extract overlay management, keyboard navigation, and focus management into dedicated services or directives. The `select-item.component.ts` is already separate, but the main component carries too much responsibility.

**setTimeout Usage for Animation Timing:**
- Problem: Multiple components use `setTimeout` with hardcoded delays (0ms, 150ms, 300ms) for animation coordination, focus management, and cleanup.
- Files: `registry-ng/vitality/ui/dialog/dialog-ref.ts` (150ms), `registry-ng/vitality/ui/sheet/sheet-ref.ts` (300ms), `registry-ng/vitality/ui/alert-dialog/alert-dialog-ref.ts` (150ms), `registry-ng/vitality/ui/select/select.component.ts` (0ms), `registry-ng/vitality/ui/dropdown/dropdown.component.ts`, `registry-ng/vitality/ui/calendar/calendar.component.ts` (0ms), `registry-ng/vitality/ui/menu/menu.directive.ts`
- Cause: Coordinating DOM operations with CSS animations/transitions without using Angular's animation system or `transitionend`/`animationend` events consistently.
- Improvement path: Use `transitionend`/`animationend` event listeners consistently (the `alert-dialog-ref.ts` already does this partially with `waitForTransitionEnd`). Replace `setTimeout(fn, 0)` with `afterNextRender` or `requestAnimationFrame` where focus management is the goal.

## Fragile Areas

**Overlay-Based Components (CDK Overlay):**
- Files: `registry-ng/vitality/ui/select/select.component.ts`, `registry-ng/vitality/ui/dropdown/dropdown.component.ts`, `registry-ng/vitality/ui/popover/popover.component.ts`, `registry-ng/vitality/ui/tooltip/tooltip.ts`, `registry-ng/vitality/ui/dialog/dialog.service.ts`, `registry-ng/vitality/ui/sheet/sheet.service.ts`, `registry-ng/vitality/ui/alert-dialog/alert-dialog.service.ts`, `registry-ng/vitality/ui/menu/menu.directive.ts`, `registry-ng/vitality/ui/combobox/combobox.component.ts`, `registry-ng/vitality/ui/date-picker/date-picker.component.ts`
- Why fragile: 17 files import `@angular/cdk/overlay`. Each component implements its own overlay creation, positioning, backdrop handling, and cleanup independently. No shared overlay utility or base class. Positioning strategies are copy-pasted with minor variations. Error handling wraps overlay creation in try/catch with `console.error` (e.g., `select.component.ts:486`, `dropdown.component.ts:198`).
- Safe modification: When modifying overlay behavior, test all 10+ overlay-dependent components. Changes to CDK overlay API or positioning behavior will affect all of them independently.
- Test coverage: Zero automated tests exist for any component.

**Dialog/Sheet/Alert-Dialog Service Pattern:**
- Files: `registry-ng/vitality/ui/dialog/dialog.service.ts`, `registry-ng/vitality/ui/sheet/sheet.service.ts`, `registry-ng/vitality/ui/alert-dialog/alert-dialog.service.ts`, `registry-ng/vitality/ui/dialog/dialog-ref.ts`, `registry-ng/vitality/ui/sheet/sheet-ref.ts`, `registry-ng/vitality/ui/alert-dialog/alert-dialog-ref.ts`
- Why fragile: Three nearly identical service+ref patterns with copy-pasted code. The `dialog-ref.ts` and `sheet-ref.ts` share the same structure (enum, Subject, trigger mechanism, cleanup) with minor differences. `alert-dialog-ref.ts` uses a slightly different pattern (direct cancel/ok handlers instead of trigger enum). Fixing a bug in one requires manually replicating the fix in all three.
- Safe modification: Any change to the close/cleanup lifecycle should be applied to all three ref classes. Consider extracting a shared base class.
- Test coverage: No automated tests.

**Storybook Webpack Configuration:**
- Files: `registry-ng/.storybook/main.ts`
- Why fragile: The webpack configuration contains a workaround for `@storybook/addon-styling-webpack` stripping Angular's CSS rules (lines 49-66). It manually iterates over webpack rules to exclude `?ngResource` queries, then re-adds a handler. This is tightly coupled to Storybook's internal webpack rule structure and will break if Storybook changes its rule format.
- Safe modification: Test Storybook build after any Storybook or addon version upgrade. The workaround comment on line 49 explains the issue.
- Test coverage: No automated tests. Manual verification only.

## Scaling Limits

**Component Count in Single Flat Directory:**
- Current capacity: 47 component directories under `registry-ng/vitality/ui/`
- Limit: No technical limit, but cognitive load increases. All 47 directories are siblings with no categorization.
- Scaling path: If the component count grows significantly, consider grouping into subcategories (e.g., `ui/forms/`, `ui/overlays/`, `ui/layout/`, `ui/data-display/`). This would require updating path aliases in `registry-ng/.storybook/tsconfig.json`.

## Dependencies at Risk

**Angular CDK as Sole Overlay Provider:**
- Risk: The entire overlay system (10+ components) depends on `@angular/cdk/overlay`. If CDK changes its overlay API (e.g., the position strategy builder, `OverlayRef` interface), every overlay-dependent component must be updated independently.
- Impact: Breaking changes in CDK overlay would affect select, dropdown, popover, tooltip, dialog, sheet, alert-dialog, menu, combobox, and date-picker.
- Migration plan: No alternative needed -- CDK is the standard. But consolidating overlay logic into a shared utility would reduce the update surface.

## Missing Critical Features

**Zero Test Coverage:**
- Problem: The entire codebase has no test files. No unit tests, no integration tests, no E2E tests. The only test framework present is implied by `jest.config.*` or `vitest.config.*` references, but none exist in the project root.
- Blocks: Cannot verify component behavior after refactoring. Cannot catch regressions. Cannot validate accessibility compliance. The variant alignment work documented in `COMPONENT-ALIGNMENT.md` cannot be verified automatically.
- Priority: High. This is a component library consumed by other projects. Breaking changes in any component affect all consumers silently.

**No Angular ESLint Configuration:**
- Problem: The ESLint config (`eslint.config.mjs`) only covers the Next.js React side (`eslint-config-next`). The Angular components in `registry-ng/` have no dedicated linting. The `eslint-disable` comments in Angular files (11 occurrences across 6 files) suggest some linting runs but there is no Angular-specific ESLint plugin configured.
- Files: `eslint.config.mjs`
- Blocks: Code quality enforcement for Angular components relies entirely on manual review. TypeScript `strict` mode is enabled in the Storybook tsconfig but there is no runtime linting.

**Missing Storybook Stories:**
- Problem: 2 of 47 Angular component directories lack Storybook stories: `command/` and `icon/`. Stories serve as the only form of visual testing and documentation for the Angular components.
- Files: `registry-ng/vitality/ui/command/` (missing `command.stories.ts`), `registry-ng/vitality/ui/icon/` (missing `icon.stories.ts`)
- Blocks: These components cannot be visually verified or documented via Storybook.

## Test Coverage Gaps

**Entire Codebase Untested:**
- What's not tested: All 47 Angular components, all React registry components, all demo pages, all utility functions, all services.
- Files: Every file under `registry-ng/vitality/ui/`, `registry/vitality/ui/`, `src/`
- Risk: Any refactoring (especially the variant alignment work) could introduce visual regressions, broken keyboard navigation, broken ControlValueAccessor implementations, or broken overlay lifecycle management -- none of which would be caught automatically.
- Priority: High. Start with the most complex and fragile components: select, dropdown, dialog, sheet, calendar, resizable, and slider. These have the most internal state management and are most likely to regress.

---

*Concerns audit: 2026-02-25*
