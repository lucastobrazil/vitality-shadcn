# Testing Patterns

**Analysis Date:** 2026-03-04

## Test Framework

**Runner:**
- No test framework is installed or configured in this project
- No test runner config files detected (no `jest.config.*`, `vitest.config.*`, `cypress.config.*`, `playwright.config.*`)
- No test scripts in `package.json`

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
# No test commands available
# The only quality check available:
npm run lint              # ESLint with Next.js rules
npm run build             # Type-checking via TypeScript (strict mode)
```

## Test File Organization

**Location:**
- No test files exist in the project source code
- No `__tests__` directories, no `*.test.*` files, no `*.spec.*` files outside of `node_modules/`

**Current state:** This is a component registry / documentation site. Testing is entirely absent from the codebase.

## Quality Assurance (What Exists Instead)

In the absence of automated tests, quality is maintained through:

1. **TypeScript Strict Mode** (`tsconfig.json` has `"strict": true`):
   - Catches type errors at build time
   - All components are strongly typed via `React.ComponentProps<>` patterns

2. **ESLint** (`eslint.config.mjs`):
   - `eslint-config-next/core-web-vitals` for Next.js best practices
   - `eslint-config-next/typescript` for TypeScript-specific rules

3. **Static Site Export** (`next.config.ts` has `output: "export"`):
   - `npm run build` validates all pages render at build time
   - `generateStaticParams()` ensures all dynamic routes are pre-rendered

4. **Visual Verification via Demos**:
   - Each component has demo files in `src/app/_demos/[component]/`
   - Demos serve as manual visual regression tests
   - The docs site itself (`npm run dev`) serves as the primary verification tool

5. **Storybook (Angular Registry Only)**:
   - Angular components in `registry-ng/` have Storybook configuration
   - Run via `npm run storybook` (uses `@storybook/angular`)
   - React components do NOT have Storybook stories

## If Adding Tests

**Recommended setup for this project:**
- **Vitest** would be the natural choice (Vite-compatible, works well with Next.js)
- **@testing-library/react** for component testing
- **Playwright** for E2E visual regression testing of the docs site

**Where test files should go:**
- Co-locate tests with source: `registry/vitality/ui/button.test.tsx` alongside `registry/vitality/ui/button.tsx`
- Integration tests: `src/__tests__/` directory
- E2E tests: `e2e/` directory at project root

**What to test first (highest value):**
- `registry/vitality/lib/utils.ts` - Unit test the `cn()` utility
- `src/lib/registry.ts` - Unit test `getComponents()`, `getBlocks()`, frontmatter parsing
- `src/lib/mdx.ts` - Unit test `extractTocHeadings()`, `slugify()`, path traversal protection
- UI components with logic (not just styling): `registry/vitality/ui/sidebar.tsx` (context, state management), `registry/vitality/ui/form.tsx` (form state wiring), `registry/vitality/ui/chart.tsx` (config processing)

**Suggested test pattern matching codebase conventions:**
```typescript
// registry/vitality/lib/utils.test.ts
import { describe, it, expect } from "vitest"
import { cn } from "./utils"

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1")
  })

  it("resolves tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4")
  })

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra")
  })
})
```

```typescript
// src/lib/mdx.test.ts
import { describe, it, expect } from "vitest"
import { extractTocHeadings } from "./mdx"

describe("extractTocHeadings", () => {
  it("extracts h2 and h3 headings", () => {
    const source = "## Getting Started\n\nSome text\n\n### Installation"
    const toc = extractTocHeadings(source)
    expect(toc).toEqual([
      { title: "Getting Started", url: "#getting-started", depth: 2 },
      { title: "Installation", url: "#installation", depth: 3 },
    ])
  })
})
```

## Mocking

**Framework:** Not applicable (no tests exist)

**If adding mocking, recommended patterns:**
- Mock `fs` module for `src/lib/registry.ts` and `src/lib/mdx.ts` tests
- Use `vi.mock()` (Vitest) for module mocking
- No external APIs to mock; this is a static site

## Coverage

**Requirements:** None enforced

**Current coverage:** 0% (no tests exist)

## Test Types

**Unit Tests:**
- Not present. Would target: utility functions, parsing logic, heading extraction

**Integration Tests:**
- Not present. Would target: MDX compilation pipeline, registry metadata generation

**E2E Tests:**
- Not present. Would target: component demo rendering, navigation, dark mode toggle

**Visual Regression:**
- Not present. The demo pages at `src/app/_demos/` could serve as baseline screenshots for visual regression testing with Playwright

## Storybook (Angular Only)

**Configuration:** `angular.json` defines Storybook targets for `registry-ng` project

**Run Commands:**
```bash
npm run storybook           # Start Storybook dev server
npm run storybook:build     # Build static Storybook
```

**Note:** Storybook is configured exclusively for the Angular component registry (`registry-ng/`). The React component registry (`registry/vitality/`) does not use Storybook.

---

*Testing analysis: 2026-03-04*
