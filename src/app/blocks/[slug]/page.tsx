import { notFound } from "next/navigation";
import { blocks } from "../../registry";
import { DemoPreview } from "../../_components/demo-preview";
import { StatusBadge } from "@/registry/vitality/ui/status-badge";
import { mdxFileExists, getMdxSlugs, compileMdxPage } from "@/lib/mdx";
import { mdxComponents } from "../../_components/mdx-components";

export function generateStaticParams() {
  const registrySlugs = blocks.map((b) => b.slug);
  const mdxSlugs = getMdxSlugs("blocks");
  const allSlugs = [...new Set([...registrySlugs, ...mdxSlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (mdxFileExists("blocks", slug)) {
    const { frontmatter } = await compileMdxPage("blocks", slug, mdxComponents);
    return {
      title: `${frontmatter.title} — Vitality Blocks`,
      description: frontmatter.description,
    };
  }

  const meta = blocks.find((b) => b.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.name} — Vitality Blocks`,
    description: meta.description,
  };
}

export default async function BlockPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (mdxFileExists("blocks", slug)) {
    const { content, frontmatter } = await compileMdxPage("blocks", slug, mdxComponents);

    return (
      <>
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{frontmatter.title}</h1>
            <StatusBadge severity="info" className="text-xs">
              Block
            </StatusBadge>
          </div>
          <p className="mt-1 text-muted-foreground">{frontmatter.description}</p>
        </div>
        <div className="mdx-content">{content}</div>
      </>
    );
  }

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
