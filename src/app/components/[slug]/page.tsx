import { notFound } from "next/navigation"
import { components } from "../../registry"
import { DemoPreview } from "../../_components/demo-preview"
import { StatusBadge } from "@/registry/vitality/ui/status-badge"

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const meta = components.find((c) => c.slug === slug)
    if (!meta) return {}
    return {
      title: `${meta.name} — Vitality`,
      description: meta.description,
    }
  })
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
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
