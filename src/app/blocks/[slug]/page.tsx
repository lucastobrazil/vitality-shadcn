import { notFound } from "next/navigation";
import { getBlocks } from "@/lib/registry";
import { DemoPreview } from "../../_components/demo-preview";
import { StatusBadge } from "@/registry/vitality/ui/status-badge";
import { mdxFileExists, compileMdxPage } from "@/lib/mdx";
import { mdxComponents } from "../../_components/mdx-components";
import { DocsTableOfContents } from "../../_components/docs-toc";

export function generateStaticParams() {
  return getBlocks().map((b) => ({ slug: b.slug }));
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

  const meta = getBlocks().find((b) => b.slug === slug);
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
    const { content, frontmatter, toc } = await compileMdxPage("blocks", slug, mdxComponents);

    return (
      <div className="flex items-start gap-10">
        <div className="mx-auto min-w-0 flex-1 max-w-[40rem]">
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
        </div>
        {toc.length > 0 && (
          <div className="sticky top-16 hidden max-h-[calc(100svh-6rem)] w-48 shrink-0 overflow-y-auto xl:block">
            <DocsTableOfContents toc={toc} />
          </div>
        )}
      </div>
    );
  }

  const meta = getBlocks().find((b) => b.slug === slug);
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
