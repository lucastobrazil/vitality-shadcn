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
