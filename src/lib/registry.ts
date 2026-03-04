import fs from "fs"
import path from "path"

export type DemoMeta = {
  slug: string
  name: string
  description: string
  registryName: string
  source: "shadcn" | "shadcn-customised" | "vitality"
  hasDemo: boolean
}

const CONTENT_DIR = path.join(process.cwd(), "src/app/content/docs")
const DEMOS_DIR = path.join(process.cwd(), "src/app/_demos")

function parseFrontmatter(raw: string): Record<string, string> {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const obj: Record<string, string> = {}
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":")
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim()
    obj[key] = val
  }
  return obj
}

function readMetas(type: "components" | "blocks"): DemoMeta[] {
  const dir = path.join(CONTENT_DIR, type)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
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
        source: ((fm.source === "shadcn-customised" || fm.source === "vitality") ? fm.source : "shadcn") as DemoMeta["source"],
        hasDemo:
          fs.existsSync(path.join(DEMOS_DIR, `${slug}.tsx`)) ||
          fs.existsSync(path.join(DEMOS_DIR, slug, "demo.tsx")),
      }
    })
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function getComponents(): DemoMeta[] {
  return readMetas("components")
}

export function getBlocks(): DemoMeta[] {
  return readMetas("blocks")
}
