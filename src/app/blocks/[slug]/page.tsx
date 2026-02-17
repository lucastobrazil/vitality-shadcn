import { notFound } from "next/navigation";
import { blocks } from "../../registry";
import { DemoPreview } from "../../_components/demo-preview";
import { StatusBadge } from "@/registry/vitality/ui/status-badge";

export function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const meta = blocks.find((b) => b.slug === slug);
    if (!meta) return {};
    return {
      title: `${meta.name} — Vitality Blocks`,
      description: meta.description,
    };
  });
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = blocks.find((b) => b.slug === slug);
  if (!meta) notFound();

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{meta.name}</h1>
          <StatusBadge severity="info" className="text-xs">
            Block
          </StatusBadge>
        </div>
        <p className="mt-1 text-muted-foreground">{meta.description}</p>
      </div>
      <DemoPreview meta={meta} />
    </>
  );
}
