import fs from "fs"
import path from "path"
import { highlight } from "./shiki"
import { CodeBlock } from "./code-block"
import { InstallCommand } from "./install-command"
import { LivePreview } from "./live-preview"
import type { DemoMeta } from "../registry"

export async function DemoPreview({ meta }: { meta: DemoMeta }) {
  if (!meta.hasDemo) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          No live preview available for this component.
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Install</h3>
          <InstallCommand name={meta.registryName} />
        </div>
      </div>
    )
  }

  const demoPath = path.join(process.cwd(), "src/app/_demos", `${meta.slug}.tsx`)
  const raw = fs.readFileSync(demoPath, "utf-8")
  const code = raw.replace(/^"use client"\n?\n?/, "")
  const html = await highlight(code)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Preview</h3>
        <div className="rounded-lg border p-6">
          <LivePreview slug={meta.slug} />
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Code</h3>
        <CodeBlock html={html} code={code} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Install</h3>
        <InstallCommand name={meta.registryName} />
      </div>
    </div>
  )
}
