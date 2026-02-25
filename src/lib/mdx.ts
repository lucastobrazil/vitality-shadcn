import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypeShiki from "@shikijs/rehype"
import type { ReactElement } from "react"

export type MdxFrontmatter = {
  title: string
  description: string
  isCustom?: boolean
  registryName?: string
}

const CONTENT_DIR = path.join(process.cwd(), "content/docs")

function mdxPath(type: "components" | "blocks", slug: string) {
  return path.join(CONTENT_DIR, type, `${slug}.mdx`)
}

export function mdxFileExists(type: "components" | "blocks", slug: string) {
  return fs.existsSync(mdxPath(type, slug))
}

export function getMdxSlugs(type: "components" | "blocks") {
  const dir = path.join(CONTENT_DIR, type)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""))
}

export async function compileMdxPage(
  type: "components" | "blocks",
  slug: string,
  components: Record<string, React.ComponentType<any>>
): Promise<{ content: ReactElement; frontmatter: MdxFrontmatter }> {
  const source = fs.readFileSync(mdxPath(type, slug), "utf-8")

  const { content, frontmatter } = await compileMDX<MdxFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        rehypePlugins: [
          [
            rehypeShiki as any,
            {
              themes: {
                light: "github-light",
                dark: "github-dark",
              },
            },
          ],
        ],
      },
    },
    components,
  })

  return { content, frontmatter }
}
