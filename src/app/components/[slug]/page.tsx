import { notFound } from "next/navigation"
import { components } from "../../registry"
import { DemoPreview } from "../../_components/demo-preview"
import { StatusBadge } from "@/registry/vitality/ui/status-badge"
import { mdxFileExists, getMdxSlugs, compileMdxPage } from "@/lib/mdx"
import { mdxComponents } from "../../_components/mdx-components"

export function generateStaticParams() {
  const registrySlugs = components.map((c) => c.slug)
  const mdxSlugs = getMdxSlugs("components")
  const allSlugs = [...new Set([...registrySlugs, ...mdxSlugs])]
  return allSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  if (mdxFileExists("components", slug)) {
    const { frontmatter } = await compileMdxPage("components", slug, mdxComponents)
    return {
      title: `${frontmatter.title} — Vitality`,
      description: frontmatter.description,
    }
  }

  const meta = components.find((c) => c.slug === slug)
  if (!meta) return {}
  return {
    title: `${meta.name} — Vitality`,
    description: meta.description,
  }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (mdxFileExists("components", slug)) {
    const { content, frontmatter } = await compileMdxPage("components", slug, mdxComponents)
    const meta = components.find((c) => c.slug === slug)

    return (
      <>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{frontmatter.title}</h1>
            {(frontmatter.isCustom ?? meta?.isCustom) && (
              <StatusBadge severity="brand" className="text-xs">
                Custom
              </StatusBadge>
            )}
          </div>
          <p className="mt-1 text-muted-foreground">{frontmatter.description}</p>
        </div>
        <div className="mdx-content">{content}</div>
      </>
    )
  }

  const meta = components.find((c) => c.slug === slug)
  if (!meta) notFound()

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{meta.name}</h1>
          {meta.isCustom && (
            <StatusBadge severity="brand" className="text-xs">
              Custom
            </StatusBadge>
          )}
        </div>
        <p className="mt-1 text-muted-foreground">{meta.description}</p>
      </div>
      <DemoPreview meta={meta} />
    </>
  )
}
