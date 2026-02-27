# Editable Live Code Previews

## Context

Component doc pages show a rendered preview and a static, read-only code block (Shiki-highlighted HTML via `dangerouslySetInnerHTML`). The user wants the code to be editable with the rendered preview updating in real-time, like a live playground.

## Approach: react-live

Use `react-live` — lightweight (~15KB), uses Sucrase for in-browser JSX/TSX transpilation, provides `LiveProvider`/`LiveEditor`/`LivePreview`/`LiveError`.

**How it works:** The server component reads the demo file, transforms the code (strips imports/exports), and highlights it with Shiki. The client component shows the Shiki view by default. When the user clicks "Edit", it swaps to react-live's `LiveEditor` + `LivePreview`. All components the code references are provided via a `scope` object.

### Code transformation (server-side)

Transform demo code for react-live's `noInline` mode:

```
"use client"                                    ← strip
import { Badge } from "@/registry/vitality/…"   ← strip (including multi-line imports)
import { type ChartConfig } from "…"            ← strip
} satisfies ChartConfig                         ← strip `satisfies X`

export default function BadgeDemo() {           ← remove `export default`
  return <Badge>Hello</Badge>
}
                                                ← append: render(<BadgeDemo />)
```

### Scope module

A single client module that imports all available components so any demo code can reference them:

- **React:** `useState`, `useEffect`
- **All 44 UI components** from `@/registry/vitality/ui/*` (every named export)
- **2 block components** from `@/registry/vitality/blocks/*`
- **Lucide icons** used across demos: `ChevronsUpDownIcon`, `SlashIcon`, `MailIcon`, `ChevronRightIcon`, `PlusIcon`, `InfoIcon`, `AlertTriangleIcon`, `CheckCircleIcon`, `XCircleIcon`, `BoldIcon`, `ItalicIcon`, `UnderlineIcon`, `AlignLeftIcon`, `AlignCenterIcon`, `AlignRightIcon`, `UserIcon`, `SettingsIcon`, `LogOutIcon`, `BellIcon`, `CalendarDaysIcon`, `SparklesIcon`, `MinusIcon`, `MessageSquareIcon`, `TrashIcon`, `CreditCardIcon`, `SearchIcon`, `DollarSignIcon`, `LinkIcon`, `CalendarIcon`, `SmileIcon`, `CalculatorIcon`
- **Third-party:** `useForm` (react-hook-form), `Bar`/`BarChart`/`XAxis`/`YAxis` (recharts), `toast` (sonner)

Bundle cost is acceptable for a docs site — most of these modules are already in the page bundle via `LivePreview`'s dynamic imports.

### UX: Two modes (view / edit)

| Mode | Preview pane | Code pane |
|------|-------------|-----------|
| **View** (default) | Existing `<LivePreview>` (pre-built demo via `next/dynamic`) | Shiki-highlighted HTML (read-only, same look as today) |
| **Edit** (toggle) | react-live `<LivePreview>` (re-evaluates on every keystroke) | react-live `<LiveEditor>` (editable, Prism highlighting) |

Toolbar buttons: **Copy** (copies original code with imports) · **Edit/View toggle** · **Reset** (only visible when code is modified) · **Expand/Collapse**

## Files

| File | Change |
|------|--------|
| `package.json` | `npm install react-live` |
| `src/app/_components/transform-demo-code.ts` | **New** — `transformDemoCode(raw)` returns `{ code, componentName, displayCode }` |
| `src/app/_components/live-code-scope.ts` | **New** — exports `liveCodeScope` object with all components/hooks/icons |
| `src/app/_components/live-code.tsx` | **New** — `LiveCode` client component wrapping react-live |
| `src/app/_components/mdx-components.tsx` | Update `ComponentPreview` to use `transformDemoCode` + `LiveCode` instead of `CodeBlock` |
| `src/app/_components/demo-preview.tsx` | Same change as `ComponentPreview` for the non-MDX fallback path |
| `src/app/globals.css` | Add `.live-editor` styles (font, padding, token colors via CSS vars) |

**Kept unchanged:** `code-block.tsx` (still used for generic MDX code blocks), `live-preview.tsx` (still renders the static/default preview), `shiki.ts` (still highlights the view-mode code).

## Implementation order

1. `npm install react-live`
2. Create `transform-demo-code.ts` — pure function, handles multi-line imports, `satisfies`, `export default`, appends `render()`
3. Create `live-code-scope.ts` — import all UI components, blocks, React hooks, lucide icons, third-party libs; export flat scope object
4. Create `live-code.tsx` — `LiveCode` client component with view/edit toggle, copy, reset, expand/collapse
5. Add `.live-editor` CSS to `globals.css`
6. Update `ComponentPreview` in `mdx-components.tsx`
7. Update `DemoPreview` in `demo-preview.tsx`
8. `npm run build` — verify all 55 pages compile
9. `npm run dev` — test edit mode on badge, dialog (multi-line imports), chart (satisfies), form (react-hook-form)

## Verify

- `npm run build` succeeds
- Default view looks identical to current (Shiki highlighting, same code block UI)
- Clicking "Edit" button shows the live editor and a react-live preview pane
- Editing code updates the preview in real-time
- Errors during typing show in a styled error banner
- "Reset" restores original code
- "Copy" copies the full code with imports
- chart, form, sonner demos all work in edit mode (third-party scope)
- Non-MDX fallback pages also get editable previews via `DemoPreview`
