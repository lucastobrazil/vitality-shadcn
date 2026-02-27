import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { transformers } from "./_components/shiki";
import { mdxComponents } from "./_components/mdx-components";
import type { MdxFrontmatter } from "@/lib/mdx";

const MDX_PATH = path.join(
  process.cwd(),
  "src/app/content/docs/getting-started.mdx",
);

export default async function GettingStarted() {
  const source = fs.readFileSync(MDX_PATH, "utf-8");

  const { content, frontmatter } = await compileMDX<MdxFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [
            rehypePrettyCode as any,
            {
              theme: {
                dark: "github-dark",
                light: "github-light-default",
              },
              transformers,
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  return (
    <div className="mx-auto max-w-[40rem]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {frontmatter.title}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {frontmatter.description}
        </p>
      </div>
      <div className="mdx-content">{content}</div>
    </div>
  );
}
