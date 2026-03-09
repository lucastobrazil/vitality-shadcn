import fs from "fs"
import path from "path"
import { highlight } from "./shiki"
import { CodeBlock } from "./code-block"
import { CopyButton } from "./copy-button"

export async function ComponentSource({
  name,
  src,
  title,
  collapsible = true,
  maxLines,
  replacements,
}: {
  name?: string
  src?: string
  title?: string
  collapsible?: boolean
  maxLines?: number
  replacements?: Record<string, string>
}) {
  let filePath: string
  const projectRoot = process.cwd()

  if (src) {
    filePath = path.resolve(projectRoot, src)
  } else if (name) {
    filePath = path.resolve(projectRoot, "registry/vitality/ui", `${name}.tsx`)
  } else {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        No source specified.
      </div>
    )
  }

  if (!filePath.startsWith(projectRoot + path.sep)) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Invalid source path.
      </div>
    )
  }

  if (!fs.existsSync(filePath)) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Source not available for &ldquo;{name ?? src}&rdquo;.
      </div>
    )
  }

  let code = fs.readFileSync(filePath, "utf-8")

  // Strip "use client" directive from demo source files
  if (src) {
    code = code.replace(/^"use client";?\n?\n?/, "")
  }

  // Apply string replacements
  if (replacements) {
    for (const [search, replace] of Object.entries(replacements)) {
      code = code.replaceAll(search, replace)
    }
  }

  if (maxLines) {
    code = code.split("\n").slice(0, maxLines).join("\n")
  }

  const html = await highlight(code)

  const figure = (
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-[var(--code-foreground)] flex items-center gap-2"
          data-language="tsx"
        >
          {title}
        </figcaption>
      )}
      <CopyButton value={code} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  )

  if (!collapsible) {
    return <div className="relative">{figure}</div>
  }

  return (
    <CodeBlock>
      {figure}
    </CodeBlock>
  )
}
