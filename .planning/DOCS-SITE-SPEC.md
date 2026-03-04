# Component Documentation Site Spec

A complete guide for building a shadcn/ui-style component documentation site from a fresh Next.js install. Uses MDX for content, Shiki for syntax highlighting, and a folder-based demo system with live previews.

---

## Prerequisites

- Next.js 16+ (App Router, Turbopack)
- Tailwind CSS v4
- `next-mdx-remote` for server-side MDX compilation
- `shiki` + `@shikijs/rehype` for syntax highlighting
- A shadcn-style component registry at `registry/{style}/ui/`
- `radix-ui` primitives (for Tabs, etc.)
- `class-variance-authority` + `lucide-react`

```bash
npm install next-mdx-remote shiki @shikijs/rehype class-variance-authority lucide-react radix-ui
```

---

## Directory Structure

```
src/
  app/
    content/
      docs/
        components/          # MDX docs per component
          button.mdx
          accordion.mdx
          ...
    _demos/                  # Live demo components
      button/
        demo.tsx             # Default demo
        size.tsx             # Variant: button sizes
        outline.tsx          # Variant: outline button
        ...
      accordion/
        demo.tsx
        basic.tsx
        multiple.tsx
        ...
    _components/             # Docs infrastructure
      mdx-components.tsx     # MDX component registry
      live-preview.tsx       # Client-side dynamic demo loader
      code-block.tsx         # Collapsible code display with copy
      component-source.tsx   # Registry source viewer
      code-tabs.tsx          # CLI/Manual installation tabs
      steps.tsx              # Numbered instruction steps
      install-command.tsx    # CLI install command with copy
      mdx-callout.tsx        # Info callout wrapper
      shiki.ts               # Syntax highlighting utility
    components/
      [slug]/
        page.tsx             # Dynamic component page
  lib/
    mdx.ts                   # MDX compilation + TOC extraction
    registry.ts              # Component metadata from frontmatter
    utils.ts                 # cn() utility
registry/
  {style}/
    ui/
      button.tsx             # Actual component source files
      accordion.tsx
      ...
```

---

## Core Files

### 1. Syntax Highlighting — `_components/shiki.ts`

Server-side Shiki highlighter with dual-theme support (light + dark).

```ts
import { createHighlighter, type Highlighter } from "shiki"

let highlighter: Highlighter | null = null

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "css", "bash"],
    })
  }
  return highlighter
}

export async function highlight(
  code: string,
  lang: "tsx" | "css" | "bash" = "tsx"
): Promise<string> {
  const h = await getHighlighter()
  return h.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
  })
}
```

### 2. Code Block — `_components/code-block.tsx`

Client component with copy-to-clipboard and expand/collapse.

```tsx
"use client"

import { useState } from "react"
import { CopyIcon, CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
import { Button } from "@/registry/{style}/ui/button"

export function CodeBlock({ html, code }: { html: string; code: string }) {
  const [expanded, setExpanded] = useState(false)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg border bg-muted/30">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">Code</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-xs" onClick={copy}>
            {copied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronUpIcon className="size-3" /> : <ChevronDownIcon className="size-3" />}
          </Button>
        </div>
      </div>
      <div className={`overflow-hidden ${expanded ? "" : "max-h-64"} relative`}>
        <div
          className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_code]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-muted/80 to-transparent" />
        )}
      </div>
    </div>
  )
}
```

### 3. Live Preview — `_components/live-preview.tsx`

Client component that dynamically imports demo files at runtime.

```tsx
"use client"

import dynamic from "next/dynamic"

export function LivePreview({ slug }: { slug: string }) {
  const Demo = dynamic(() => import(`../_demos/${slug}`), {
    loading: () => (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Loading preview...
      </div>
    ),
  })

  return <Demo />
}
```

The `slug` supports nested paths like `"button/size"` which resolves to `_demos/button/size.tsx`.

### 4. Component Preview — in `mdx-components.tsx`

Server component that reads demo source, highlights it, and pairs it with the live preview.

```tsx
function resolveDemoPath(name: string): { filePath: string; slug: string } | null {
  const demosBase = path.join(process.cwd(), "src/app/_demos")

  // Direct file: _demos/button.tsx or _demos/button/size.tsx
  const directPath = path.join(demosBase, `${name}.tsx`)
  if (fs.existsSync(directPath)) {
    return { filePath: directPath, slug: name }
  }

  // Folder fallback: _demos/button/demo.tsx when name="button"
  if (!name.includes("/")) {
    const folderPath = path.join(demosBase, name, "demo.tsx")
    if (fs.existsSync(folderPath)) {
      return { filePath: folderPath, slug: `${name}/demo` }
    }
  }

  return null
}

async function ComponentPreview({ name }: { name: string }) {
  const resolved = resolveDemoPath(name)
  if (!resolved) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        No preview available for &ldquo;{name}&rdquo;.
      </div>
    )
  }

  const raw = fs.readFileSync(resolved.filePath, "utf-8")
  const code = raw.replace(/^"use client"\n?\n?/, "")
  const html = await highlight(code)

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-6">
        <LivePreview slug={resolved.slug} />
      </div>
      <CodeBlock html={html} code={code} />
    </div>
  )
}
```

### 5. Component Source — `_components/component-source.tsx`

Server component that displays the actual registry component source code.

```tsx
import fs from "fs"
import path from "path"
import { highlight } from "./shiki"
import { CodeBlock } from "./code-block"

export async function ComponentSource({
  name,
  title,
}: {
  name: string
  title?: string
}) {
  const filePath = path.join(process.cwd(), "registry/{style}/ui", `${name}.tsx`)

  if (!fs.existsSync(filePath)) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Source not available for &ldquo;{name}&rdquo;.
      </div>
    )
  }

  const code = fs.readFileSync(filePath, "utf-8")
  const html = await highlight(code)

  return (
    <div className="my-4">
      {title && (
        <div className="flex items-center rounded-t-lg border border-b-0 bg-muted/30 px-4 py-2 text-xs font-medium text-muted-foreground">
          {title}
        </div>
      )}
      <CodeBlock html={html} code={code} />
    </div>
  )
}
```

### 6. Code Tabs — `_components/code-tabs.tsx`

Client component for tabbed CLI/Manual installation views.

```tsx
"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/registry/{style}/ui/tabs"

export function CodeTabs({ children }: { children: React.ReactNode }) {
  const [value, setValue] = React.useState("cli")

  return (
    <Tabs value={value} onValueChange={setValue} className="relative mt-6 w-full">
      {children}
    </Tabs>
  )
}
```

The MDX uses the raw `TabsList`, `TabsTrigger`, `TabsContent` components inside `CodeTabs`.

### 7. Steps — `_components/steps.tsx`

Numbered instruction steps using CSS counters.

```tsx
import { cn } from "@/lib/utils"

export function Steps({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8", className)}
      {...props}
    />
  )
}

export function Step({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn("step mt-8 scroll-mt-28 text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  )
}
```

Requires CSS in `globals.css`:

```css
/* Steps counter for manual installation guides */
.steps > .step {
  counter-increment: step;
}

.steps > .step::before {
  content: counter(step);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  border-radius: 9999px;
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 500;
  background: var(--muted);
  color: var(--foreground);
}

@media (min-width: 768px) {
  .steps > .step::before {
    position: absolute;
    margin-left: -50px;
    margin-top: -4px;
    width: 2.25rem;
    height: 2.25rem;
    border: 4px solid var(--background);
  }
}
```

### 8. Install Command — `_components/install-command.tsx`

Client component that renders the `npx shadcn@latest add` command with copy button.

```tsx
"use client"

import { useState } from "react"
import { CopyIcon, CheckIcon } from "lucide-react"
import { Button } from "@/registry/{style}/ui/button"

const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL || "https://your-registry.vercel.app"

export function InstallCommand({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  const command = `npx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`

  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-4 py-3">
      <code className="flex-1 truncate text-sm font-mono">{command}</code>
      <Button variant="ghost" size="icon-xs" onClick={copy}>
        {copied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
      </Button>
    </div>
  )
}
```

Set `NEXT_PUBLIC_REGISTRY_URL` in your `.env.local` to point to your deployed registry.

### 9. Callout — `_components/mdx-callout.tsx`

Wrapper around your Callout component for MDX use.

```tsx
import { cn } from "@/lib/utils"
import { Callout, CalloutDescription } from "@/registry/{style}/ui/callout"

export function MdxCallout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Callout severity="info" className={cn("my-6", className)}>
      <CalloutDescription>{children}</CalloutDescription>
    </Callout>
  )
}
```

### 10. MDX Component Registry — `_components/mdx-components.tsx`

Registers all custom components and HTML element overrides for MDX.

```tsx
export const mdxComponents: Record<string, React.ComponentType<any>> = {
  // Custom doc components
  ComponentPreview,
  InstallCommand: MdxInstallCommand,
  ComponentSource,
  CodeTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Steps,
  Step,
  Callout: MdxCallout,
  Kbd,

  // HTML element overrides (styled headings, links, tables, etc.)
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: Ul,
  ol: Ol,
  a: A,
  table: Table,
  th: Th,
  td: Td,
  code: InlineCode,
}
```

Each HTML override applies consistent typography and scroll-margin for TOC anchors. Headings auto-generate `id` attributes from their text content.

---

## MDX Compilation — `lib/mdx.ts`

Compiles MDX server-side with `next-mdx-remote/rsc` and `rehype-shiki` for inline code blocks.

```ts
import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeShiki from "@shikijs/rehype"

export type MdxFrontmatter = {
  title: string
  description: string
  isCustom?: boolean
  registryName?: string
}

export type TocItem = { title: string; url: string; depth: number }

const CONTENT_DIR = path.join(process.cwd(), "src/app/content/docs")

export function extractTocHeadings(source: string): TocItem[] {
  const items: TocItem[] = []
  for (const line of source.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)$/)
    if (match) {
      const depth = match[1].length
      const title = match[2].trim()
      items.push({ title, url: `#${slugify(title)}`, depth })
    }
  }
  return items
}

export async function compileMdxPage(
  type: "components" | "blocks",
  slug: string,
  components: Record<string, React.ComponentType<any>>
) {
  const source = fs.readFileSync(path.join(CONTENT_DIR, type, `${slug}.mdx`), "utf-8")
  const toc = extractTocHeadings(source)

  const { content, frontmatter } = await compileMDX<MdxFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [rehypeShiki as any, {
            themes: { light: "github-light", dark: "github-dark" },
          }],
        ],
      },
    },
    components,
  })

  return { content, frontmatter, toc }
}
```

## Component Registry — `lib/registry.ts`

Discovers components from MDX frontmatter for sidebar navigation.

```ts
import fs from "fs"
import path from "path"

export type DemoMeta = {
  slug: string
  name: string
  description: string
  registryName: string
  isCustom: boolean
  hasDemo: boolean
}

const CONTENT_DIR = path.join(process.cwd(), "src/app/content/docs")
const DEMOS_DIR = path.join(process.cwd(), "src/app/_demos")

function readMetas(type: "components" | "blocks"): DemoMeta[] {
  const dir = path.join(CONTENT_DIR, type)
  if (!fs.existsSync(dir)) return []

  return fs.readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(dir, f), "utf-8")
      const fm = parseFrontmatter(raw)
      return {
        slug,
        name: fm.title || slug,
        description: fm.description || "",
        registryName: fm.registryName || slug,
        isCustom: fm.isCustom === "true",
        hasDemo:
          fs.existsSync(path.join(DEMOS_DIR, `${slug}.tsx`)) ||
          fs.existsSync(path.join(DEMOS_DIR, slug, "demo.tsx")),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}
```

---

## Component Page — `components/[slug]/page.tsx`

Dynamic route that renders a component's MDX documentation.

```tsx
import { notFound } from "next/navigation"
import { getComponents } from "@/lib/registry"
import { mdxFileExists, compileMdxPage } from "@/lib/mdx"
import { mdxComponents } from "../../_components/mdx-components"

export function generateStaticParams() {
  return getComponents().map((c) => ({ slug: c.slug }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!mdxFileExists("components", slug)) notFound()

  const { content, frontmatter, toc } = await compileMdxPage("components", slug, mdxComponents)

  return (
    <div className="flex items-start gap-10">
      <div className="min-w-0 flex-1">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight">{frontmatter.title}</h1>
          <p className="mt-1 text-muted-foreground">{frontmatter.description}</p>
        </div>
        <div className="mdx-content">{content}</div>
      </div>
      {/* Optional TOC sidebar */}
    </div>
  )
}
```

---

## globals.css Additions

Beyond the steps counter CSS (shown above), add these for MDX content and code blocks:

```css
/* MDX content wrapper */
.mdx-content > :first-child {
  margin-top: 0;
}

/* rehype-pretty-code (shiki) code blocks in MDX */
[data-rehype-pretty-code-figure] {
  @apply my-4;
}

[data-rehype-pretty-code-figure] pre {
  @apply overflow-x-auto rounded-lg border p-4;
}

[data-rehype-pretty-code-figure] code {
  @apply text-sm leading-relaxed;
  background: transparent;
  padding: 0;
  border-radius: 0;
}

[data-rehype-pretty-code-figure] [data-line] {
  @apply px-4 -mx-4;
}

[data-rehype-pretty-code-figure] [data-highlighted-line] {
  @apply bg-muted/50;
}

/* Dual theme toggling */
[data-rehype-pretty-code-figure] pre [data-theme="github-dark"],
[data-rehype-pretty-code-figure] code [data-theme="github-dark"] {
  display: none;
}

.dark [data-rehype-pretty-code-figure] pre [data-theme="github-light"],
.dark [data-rehype-pretty-code-figure] code [data-theme="github-light"] {
  display: none;
}

.dark [data-rehype-pretty-code-figure] pre [data-theme="github-dark"],
.dark [data-rehype-pretty-code-figure] code [data-theme="github-dark"] {
  display: initial;
}
```

---

## MDX Frontmatter Format

```yaml
---
title: Button
description: Displays a button or a component that looks like a button.
registryName: button        # Must match the registry filename
isCustom: true              # Optional — shows a "Custom" badge
---
```

---

## MDX Document Structure

Every component doc follows this structure:

```mdx
---
title: {Component Name}
description: {One-line description}
registryName: {component-name}
---

<ComponentPreview name="{component-name}/demo" />

## Installation

<CodeTabs>

<TabsList variant="line">
  <TabsTrigger value="cli">Command</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

<InstallCommand name="{component-name}" />

</TabsContent>

<TabsContent value="manual">

<Steps className="mb-0 pt-2">

<Step>Install the following dependencies:</Step>

```bash
npm install radix-ui
```

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="{component-name}" title="registry/{style}/ui/{component-name}.tsx" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</CodeTabs>

## Usage

```tsx
import { ComponentName } from "@/registry/{style}/ui/{component-name}"
```

```tsx
<ComponentName>Example</ComponentName>
```

## Examples

### Variant Name

Description of what this variant shows.

<ComponentPreview name="{component-name}/{variant}" />

## API Reference

### ComponentName

Description.

| Prop | Type | Default |
| ---- | ---- | ------- |
| `variant` | `"default" \| "outline"` | `"default"` |
```

---

## Demo File Conventions

### Folder structure

Each component gets a folder under `_demos/`:

```
_demos/
  button/
    demo.tsx          # Default/main demo
    size.tsx          # Size variants
    outline.tsx       # Outline variant
    with-icon.tsx     # With icon example
    ...
```

### Demo file template

```tsx
"use client"

import { Button } from "@/registry/{style}/ui/button"

export default function ButtonOutline() {
  return <Button variant="outline">Outline</Button>
}
```

Rules:
- Always include `"use client"` directive
- Always use a `default export`
- Import from `@/registry/{style}/ui/` (never `@/components/ui/`)
- Function name should be `{ComponentName}{Variant}` (e.g., `ButtonOutline`)
- Keep demos focused — one concept per file
- Use `lucide-react` for icons

### Referencing demos in MDX

```mdx
<!-- Resolves to _demos/button/size.tsx -->
<ComponentPreview name="button/size" />

<!-- Resolves to _demos/button/demo.tsx (folder fallback) -->
<ComponentPreview name="button" />
```

---

## Adding a New Component

1. **Create the component** in `registry/{style}/ui/{name}.tsx`
2. **Create the demo folder** at `src/app/_demos/{name}/`
3. **Write `demo.tsx`** — the default demo
4. **Write variant demos** — one file per example (e.g., `size.tsx`, `disabled.tsx`)
5. **Write the MDX** at `src/app/content/docs/components/{name}.mdx` following the structure above
6. **Verify** — run `next build` to check for TypeScript errors and page generation

---

## Migrating from shadcn/ui Docs

When adapting content from the upstream shadcn/ui repository:

### Frontmatter
Replace `base`, `component`, `featured`, `links` with `registryName` and optionally `isCustom`.

### ComponentPreview
`<ComponentPreview styleName="radix-nova" name="button-size" />` becomes `<ComponentPreview name="button/size" />`

Strip: `styleName`, `align`, `previewClassName`, `type`, `description`, `direction` props.

### Installation section
Replace the raw `npx shadcn@latest add {name}` bash block with `<InstallCommand name="{name}" />`. Strip `styleName` from `ComponentSource`. Update `title` to `registry/{style}/ui/{name}.tsx`.

### Import paths
`@/components/ui/` → `@/registry/{style}/ui/`

### Internal links
`/docs/components/radix/{name}` → `/components/{name}`

### Demo files
`@/examples/radix/ui/` → `@/registry/{style}/ui/`

### Sections to remove
- RTL sections (unless you add RTL support)

### Variant mapping
Check that the component variants used in demos match your registry. For example, shadcn/ui has `variant="secondary"` on Button, but your registry may not.
