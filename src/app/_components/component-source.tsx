import fs from "fs"
import path from "path"
import { highlight } from "./shiki"
import { CodeBlock } from "./code-block"
import { CopyButton } from "./copy-button"

export async function ComponentSource({
  name,
  title,
  collapsible = true,
}: {
  name: string
  title?: string
  collapsible?: boolean
}) {
  const filePath = path.join(
    process.cwd(),
    "registry/vitality/ui",
    `${name}.tsx`
  )

  if (!fs.existsSync(filePath)) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        Source not available for &ldquo;{name}&rdquo;.
      </div>
    )
  }

  const code = fs.readFileSync(filePath, "utf-8")
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
