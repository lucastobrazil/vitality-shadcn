import { notFound } from "next/navigation";
import { getComponents } from "@/lib/registry";
import { DemoPreview } from "../../_components/demo-preview";
import { StatusBadge } from "@/registry/vitality/ui/status-badge";
import { mdxFileExists, compileMdxPage } from "@/lib/mdx";
import { mdxComponents } from "../../_components/mdx-components";
import { DocsTableOfContents } from "../../_components/docs-toc";

export function generateStaticParams() {
  return getComponents().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (mdxFileExists("components", slug)) {
    const { frontmatter } = await compileMdxPage(
      "components",
      slug,
      mdxComponents,
    );
    return {
      title: `${frontmatter.title} — Vitality`,
      description: frontmatter.description,
    };
  }

  const meta = getComponents().find((c) => c.slug === slug);
  if (!meta) return {};
  return {
    title: `${meta.name} — Vitality`,
    description: meta.description,
  };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (mdxFileExists("components", slug)) {
    const { content, frontmatter, toc } = await compileMdxPage(
      "components",
      slug,
      mdxComponents,
    );
    const meta = getComponents().find((c) => c.slug === slug);

    return (
      <div className="flex items-start gap-10">
        <div className="mx-auto min-w-0 flex-1 max-w-[40rem]">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">
                {frontmatter.title}
              </h1>
              {(frontmatter.source ?? meta?.source) === "shadcn-customised" && (
                <StatusBadge severity="info" className="text-xs">
                  Customised
                </StatusBadge>
              )}
              {(frontmatter.source ?? meta?.source) === "vitality" && (
                <StatusBadge severity="brand" className="text-xs">
                  Custom
                </StatusBadge>
              )}
            </div>
            <p className="mt-1 text-muted-foreground">
              {frontmatter.description}
            </p>
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

  const meta = getComponents().find((c) => c.slug === slug);
  if (!meta) notFound();

  return (
    <>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{meta.name}</h1>
          {meta.source === "shadcn-customised" && (
            <StatusBadge severity="info" className="text-xs">
              Customised
            </StatusBadge>
          )}
          {meta.source === "vitality" && (
            <StatusBadge severity="brand" className="text-xs">
              Custom
            </StatusBadge>
          )}
        </div>
        <p className="mt-1 text-muted-foreground">{meta.description}</p>
      </div>
      <DemoPreview meta={meta} />
    </>
  );
}
