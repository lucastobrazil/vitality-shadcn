# Codebase Concerns

**Analysis Date:** 2026-03-04

## Tech Debt

**No Automated Tests:**
- Issue: Zero test files exist in the entire project (no `.test.*`, `.spec.*`, or `__tests__` directories outside `node_modules`). This is a component library -- the most critical type of project to have tests for.
- Files: Entire codebase (`src/`, `registry/vitality/ui/`, `registry-ng/vitality/ui/`)
- Impact: Any refactoring or new component addition risks breaking existing components silently. No regression safety net.
- Fix approach: Add a test framework (Vitest for React, Jest/Karma for Angular). Prioritize testing components with complex state: `registry/vitality/ui/combobox.tsx` (310 lines), `registry/vitality/ui/sidebar.tsx` (726 lines), `registry/vitality/ui/carousel.tsx` (241 lines). Angular components should have unit tests alongside their `.stories.ts` files.

**Duplicated MDX Compilation Logic:**
- Issue: MDX compilation with rehype-pretty-code is configured identically in two places, with slightly different theme settings (one uses `github-dark-default`, the other uses `github-dark`).
- Files: `src/lib/mdx.ts` (lines 71-92), `src/app/page.tsx` (lines 18-39)
- Impact: Theme inconsistency between the getting-started page and component documentation pages. Changes to MDX config must be made in two places.
- Fix approach: Extract a shared `compileMdxWithConfig()` helper in `src/lib/mdx.ts` and use it in both locations. Standardize on one dark theme (`github-dark-default`).

**Duplicated `slugify` Function:**
- Issue: The `slugify()` function is defined identically in two files.
- Files: `src/lib/mdx.ts` (lines 18-25), `src/app/_components/mdx-components.tsx` (lines 124-131)
- Impact: Divergence risk if one is updated but not the other. Heading anchors could mismatch between TOC generation and rendered headings.
- Fix approach: Export `slugify` from `src/lib/mdx.ts` and import it in `src/app/_components/mdx-components.tsx`.

**Custom Frontmatter Parser Instead of Library:**
- Issue: `src/lib/registry.ts` contains a hand-rolled `parseFrontmatter()` function (lines 16-28) that does basic key-value parsing. It does not handle quoted strings, multiline values, arrays, or nested YAML.
- Files: `src/lib/registry.ts`
- Impact: Frontmatter with colons in values, quoted strings, or multiline descriptions will parse incorrectly. The MDX compilation in `src/lib/mdx.ts` uses `next-mdx-remote`'s proper parser, creating inconsistency.
- Fix approach: Use a lightweight YAML frontmatter parser (e.g., `gray-matter`) or reuse the `compileMDX` approach for metadata extraction.

**`chip` Component Lowercase Export:**
- Issue: The `chip` component is exported as a lowercase function name (`function chip(...)`) instead of PascalCase like all other components. Demo files import it with aliasing: `import { chip as Chip }`.
- Files: `registry/vitality/ui/chip.tsx` (line 22), `src/app/_demos/chip/demo.tsx`, `src/app/_demos/chip/mixed.tsx`, `src/app/_demos/chip/icon.tsx`
- Impact: Inconsistent API. Consumers must rename on import. Breaks the convention that all React components use PascalCase.
- Fix approach: Rename the export to `Chip` (PascalCase). Update all demo imports.

**`use-mobile.ts` Placed in Wrong Registry Directory:**
- Issue: `registry/vitality/ui/use-mobile.ts` is a hook file sitting inside the `ui/` directory. The registry has a dedicated `registry/vitality/hooks/` directory with its own `use-mobile.ts`.
- Files: `registry/vitality/ui/use-mobile.ts`, `registry/vitality/hooks/use-mobile.ts`
- Impact: Confusing for consumers. The `registry.json` correctly points to `registry/vitality/hooks/use-mobile.ts`, but the duplicate in `ui/` could cause import confusion.
- Fix approach: Remove `registry/vitality/ui/use-mobile.ts` (it appears to be a leftover). Verify all imports reference the hooks directory version.

**Debug Log File Committed to Repository:**
- Issue: `debug-storybook.log` is committed to the repository root. It contains local filesystem paths and debug output.
- Files: `debug-storybook.log`
- Impact: Clutters repository. Exposes local development environment details.
- Fix approach: Remove the file and add `*.log` or `debug-storybook.log` to `.gitignore`.

## Known Bugs

**Shiki Transformer Package Manager Detection Overlap:**
- Symptoms: Commands starting with `npx create-` will be matched by both the `npx create-` block AND the generic `npx` block (lines 26-44 in `src/app/_components/shiki.ts`), since both conditions are `if` (not `else if`). The generic `npx` block will overwrite the `__yarn__`, `__pnpm__`, and `__bun__` properties with incorrect conversions.
- Files: `src/app/_components/shiki.ts` (lines 19-44)
- Trigger: Any MDX code block starting with `npx create-` (e.g., `npx create-next-app`).
- Workaround: None active. The `npx create-` specific conversion (line 29: `yarn create `) gets overwritten by the generic conversion (line 41: `yarn`), resulting in `yarn create-next-app` instead of `yarn create next-app`.

**Storybook Build Broken (Legacy Config):**
- Symptoms: Storybook fails to start with `SB_FRAMEWORK_ANGULAR_0001 (AngularLegacyBuildOptionsError)`. The `debug-storybook.log` file captures this error.
- Files: `angular.json`, `debug-storybook.log`, `registry-ng/.storybook/main.ts`
- Trigger: Running `npm run storybook` locally.
- Workaround: The CI pipeline in `.github/workflows/deploy.yml` still runs `npm run storybook:build` -- unclear if this succeeds in CI or is also broken.

## Security Considerations

**Path Traversal Protection Present but Incomplete:**
- Risk: The `ComponentSource` component and `mdxPath` function both validate that resolved paths stay within project boundaries. However, the `LivePreview` component at `src/app/_components/live-preview.tsx` uses `dynamic(() => import(\`../_demos/${slug}\`))` with no path validation.
- Files: `src/app/_components/live-preview.tsx` (line 6), `src/app/_components/component-source.tsx` (line 35), `src/lib/mdx.ts` (line 44)
- Current mitigation: The `slug` parameter comes from `generateStaticParams()` at build time (static export), so runtime exploitation is not possible in the deployed static site. However, during development with `next dev`, dynamic routes could theoretically accept arbitrary slugs.
- Recommendations: Add path validation to `LivePreview` for defense-in-depth, consistent with the pattern used in `component-source.tsx` and `mdx.ts`.

**`dangerouslySetInnerHTML` Usage:**
- Risk: Shiki-highlighted HTML is injected via `dangerouslySetInnerHTML` in `ComponentSource`.
- Files: `src/app/_components/component-source.tsx` (line 76)
- Current mitigation: The HTML is generated server-side by Shiki from source code files within the project, not from user input. Static export means no runtime injection path.
- Recommendations: Acceptable risk for a documentation site. No action needed unless user-submitted code is ever supported.

**No CSP or Security Headers:**
- Risk: Static site deployed to GitHub Pages has no Content-Security-Policy or other security headers.
- Files: `next.config.ts`, `.github/workflows/deploy.yml`
- Current mitigation: GitHub Pages provides basic HTTPS. Static export means no server-side attack surface.
- Recommendations: Low priority. Consider adding a `_headers` file if GitHub Pages supports it, or add CSP meta tags to the layout.

## Performance Bottlenecks

**Synchronous Filesystem Reads at Build Time:**
- Problem: Multiple functions use `fs.readFileSync()` and `fs.readdirSync()` to read component source files, MDX content, and demo detection.
- Files: `src/lib/mdx.ts` (lines 51, 57, 68), `src/lib/registry.ts` (lines 32-49), `src/app/_components/component-source.tsx` (line 51)
- Cause: Every component page reads multiple files synchronously during static generation.
- Improvement path: Not a runtime concern since the site uses `output: "export"` (fully static). Build time impact is minimal for the current ~65 components. Only becomes an issue if the registry grows to hundreds of components. Could use `fs.promises` for parallelism in `readMetas()`.

**All UI Components Marked `"use client"`:**
- Problem: Every single component in `registry/vitality/ui/` uses the `"use client"` directive (42 files), including components that are purely presentational and could be server components (e.g., `card.tsx`, `badge.tsx`, `skeleton.tsx`, `separator.tsx`, `table.tsx`).
- Files: All files in `registry/vitality/ui/` -- notably `registry/vitality/ui/card.tsx`, `registry/vitality/ui/badge.tsx`, `registry/vitality/ui/skeleton.tsx`, `registry/vitality/ui/table.tsx`, `registry/vitality/ui/kbd.tsx`
- Cause: Follows shadcn/ui convention where all components are client components. Some components (e.g., card, badge) contain no client-side logic (no hooks, no event handlers).
- Improvement path: Low priority -- this is a deliberate shadcn/ui design choice. Consumers using RSC could benefit from server-compatible variants of pure presentational components, but changing this would break compatibility with the shadcn/ui ecosystem.

## Fragile Areas

**MDX-to-Page Rendering Pipeline:**
- Files: `src/lib/mdx.ts`, `src/lib/registry.ts`, `src/app/_components/mdx-components.tsx`, `src/app/_components/live-preview.tsx`, `src/app/_components/component-source.tsx`, `src/app/components/[slug]/page.tsx`
- Why fragile: Six files coordinate to render a single component documentation page. The pipeline involves: (1) reading frontmatter for metadata, (2) compiling MDX with custom components, (3) resolving demo paths, (4) dynamic-importing demo components, (5) reading and highlighting source code. A change to any file naming convention, directory structure, or frontmatter format breaks the entire chain.
- Safe modification: When adding a new component, follow the exact pattern: create MDX in `src/app/content/docs/components/`, create demo in `src/app/_demos/`, create component in `registry/vitality/ui/`, add entry to `registry.json`. Test by running `npm run dev` and navigating to the component page.
- Test coverage: Zero automated tests. Manual verification only.

**Shiki Transformer Chain:**
- Files: `src/app/_components/shiki.ts`
- Why fragile: The transformer uses `any` types extensively (lines 6, 10, 13, 47) and relies on internal Shiki AST structure (`node.properties`, `node.tagName`, `this.source`, `this.options?.meta`). Shiki version upgrades may change the AST shape without warning.
- Safe modification: Pin Shiki version carefully. When upgrading, verify all code block features: line numbers, copy button, package manager tabs, line highlighting.
- Test coverage: None. Visual inspection only.

**Angular/React Component Parity:**
- Files: All of `registry/vitality/ui/` and `registry-ng/vitality/ui/`
- Why fragile: The two registries must maintain feature and API parity. `COMPONENT-ALIGNMENT.md` documents significant divergences in variant names, prop names, and missing components. There is no automated check that both registries expose equivalent APIs.
- Safe modification: When modifying a React component's variants or props, always check and update the Angular counterpart documented in `COMPONENT-ALIGNMENT.md`.
- Test coverage: Angular components have 46 Storybook stories but no unit tests. React components have no tests at all.

## Scaling Limits

**Static Export Architecture:**
- Current capacity: ~65 components, ~65 MDX documentation pages. Build completes in reasonable time.
- Limit: Static export rebuilds the entire site on every change. At 200+ components, build times will grow linearly. No ISR or on-demand generation possible with `output: "export"`.
- Scaling path: If the registry grows significantly, consider switching to standard Next.js SSR/ISR deployment (remove `output: "export"` from `next.config.ts`) and deploying to Vercel or similar platform.

**Single `registry.json` Manifest:**
- Current capacity: 47 items (components + blocks + hooks + libs) in one JSON file.
- Limit: Manual maintenance becomes error-prone at 100+ items. No validation that `registry.json` entries match actual files.
- Scaling path: Generate `registry.json` from filesystem scanning, or use the `shadcn build` command consistently to auto-generate it.

## Dependencies at Risk

**`rehype-pretty-code` Type Incompatibility:**
- Risk: Used as `rehypePrettyCode as any` in both `src/lib/mdx.ts` (line 79) and `src/app/page.tsx` (line 26), indicating a type mismatch between the package's exported types and `next-mdx-remote`'s expected plugin types.
- Impact: TypeScript cannot verify correct configuration. Errors only surface at runtime.
- Migration plan: Check if newer versions of `rehype-pretty-code` or `next-mdx-remote` resolve the type mismatch. Alternatively, create a typed wrapper function.

**`@base-ui/react` Early Adoption:**
- Risk: `@base-ui/react` (v1.2.0) is used by the Combobox component. Base UI is relatively new and the API may have breaking changes before stabilizing.
- Impact: Only affects `registry/vitality/ui/combobox.tsx`. Breaking changes would require rewriting the combobox.
- Migration plan: Monitor Base UI releases. The component is self-contained, so migration would be isolated.

**Mixed Angular 21 + Storybook 10 Compatibility:**
- Risk: The debug log shows Storybook 10 failing with Angular builder configuration. Angular 21 is very new and Storybook may not yet fully support it.
- Impact: Cannot run or build Storybook locally. CI pipeline may also be affected.
- Migration plan: Run `npx storybook automigrate` as suggested in the error message. May need to update `angular.json` builder configuration to match Storybook 10's expected format.

## Missing Critical Features

**No Component API Documentation:**
- Problem: Component documentation pages show demos and source code but do not include structured prop/API tables. Consumers cannot discover available props, variants, sizes, or event handlers without reading source.
- Blocks: Adoption by teams unfamiliar with the codebase. Self-service usage of the registry.

**No Automated Registry Validation:**
- Problem: No script or CI check validates that `registry.json` entries match actual files, that all components have MDX documentation, or that demo files exist for documented components.
- Blocks: Silent breakage when files are renamed, moved, or deleted. Missing documentation is only discovered manually.

**No Changelog or Versioning:**
- Problem: Package version is `0.1.0` with no changelog, release process, or semantic versioning strategy.
- Blocks: Consumers cannot track breaking changes or know when to update.

## Test Coverage Gaps

**React Component Library (Complete Gap):**
- What's not tested: All 60 React UI components in `registry/vitality/ui/`
- Files: All `.tsx` files in `registry/vitality/ui/`
- Risk: Any change to component props, variants, or internal logic could break consumers silently. Particularly risky for components with complex state: `sidebar.tsx` (726 lines), `chart.tsx` (357 lines), `combobox.tsx` (310 lines), `menubar.tsx` (276 lines).
- Priority: High

**Angular Component Library (Unit Test Gap):**
- What's not tested: All 47 Angular components in `registry-ng/vitality/ui/` have Storybook stories (46 story files) but no unit tests.
- Files: All `.component.ts` files in `registry-ng/vitality/ui/*/`
- Risk: Stories verify visual rendering but not programmatic behavior, accessibility, or edge cases. Complex components like `select.component.ts` (632 lines), `combobox.component.ts` (412 lines), and `calendar.component.ts` (383 lines) have significant logic that stories cannot fully exercise.
- Priority: High

**Documentation Site (Complete Gap):**
- What's not tested: MDX compilation pipeline, frontmatter parsing, slug resolution, demo path resolution, static params generation.
- Files: `src/lib/mdx.ts`, `src/lib/registry.ts`, `src/app/_components/mdx-components.tsx`, `src/app/_components/live-preview.tsx`
- Risk: Documentation site builds could break without warning. The custom frontmatter parser in `src/lib/registry.ts` is especially risky.
- Priority: Medium

---

*Concerns audit: 2026-03-04*
