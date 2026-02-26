import fs from "fs";
import path from "path";
import { highlight } from "./shiki";
import { CodeBlock } from "./code-block";
import { InstallCommand as InstallCommandBase } from "./install-command";
import { LivePreview } from "./live-preview";
import { Steps, Step } from "./steps";
import { CodeTabs, CodeTabsList, CodeTabsTrigger, CodeTabsContent } from "./code-tabs";
import { ComponentSource } from "./component-source";
import { MdxCallout } from "./mdx-callout";
import {
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/vitality/ui/tabs";

// --- Custom MDX components ---

function resolveDemoPath(name: string): { filePath: string; slug: string } | null {
  const demosBase = path.join(process.cwd(), "src/app/_demos");

  // Direct file: _demos/button.tsx or _demos/button/size.tsx
  const directPath = path.join(demosBase, `${name}.tsx`);
  if (fs.existsSync(directPath)) {
    return { filePath: directPath, slug: name };
  }

  // Folder fallback: _demos/button/demo.tsx when name="button"
  if (!name.includes("/")) {
    const folderPath = path.join(demosBase, name, "demo.tsx");
    if (fs.existsSync(folderPath)) {
      return { filePath: folderPath, slug: `${name}/demo` };
    }
  }

  return null;
}

async function ComponentPreview({ name }: { name: string }) {
  const resolved = resolveDemoPath(name);
  if (!resolved) {
    return (
      <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
        No preview available for &ldquo;{name}&rdquo;.
      </div>
    );
  }

  const raw = fs.readFileSync(resolved.filePath, "utf-8");
  const code = raw.replace(/^"use client"\n?\n?/, "");
  const html = await highlight(code);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-6">
        <LivePreview slug={resolved.slug} />
      </div>
      <CodeBlock html={html} code={code} />
    </div>
  );
}

function MdxInstallCommand({ name }: { name: string }) {
  return <InstallCommandBase name={name} />;
}

// --- HTML element overrides ---

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getHeadingId(children: React.ReactNode): string | undefined {
  if (typeof children === "string") return slugify(children);
  if (Array.isArray(children)) return slugify(children.map(String).join(""));
  return undefined;
}

function H2({ children, id, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      id={id ?? getHeadingId(children)}
      className="mt-10 mb-2 scroll-mt-28 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0"
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ children, id, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      id={id ?? getHeadingId(children)}
      className="mt-8 mb-2 scroll-mt-28 text-xl font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h3>
  );
}

function H4({ children, id, ...props }: React.ComponentProps<"h4">) {
  return (
    <h4
      id={id ?? getHeadingId(children)}
      className="mt-6 mb-2 scroll-mt-28 text-lg font-semibold tracking-tight"
      {...props}
    >
      {children}
    </h4>
  );
}

function P({ children, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-4"
      {...props}
    >
      {children}
    </p>
  );
}

function Ul({ children, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  );
}

function Ol({ children, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  );
}

function A({ children, ...props }: React.ComponentProps<"a">) {
  return (
    <a
      className="font-medium text-primary underline underline-offset-4"
      {...props}
    >
      {children}
    </a>
  );
}

function Table({ children, ...props }: React.ComponentProps<"table">) {
  return (
    <div className="my-6 w-full overflow-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  );
}

function Th({ children, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </th>
  );
}

function Td({ children, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </td>
  );
}

function InlineCode({ children, ...props }: React.ComponentProps<"code">) {
  return (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    >
      {children}
    </code>
  );
}

// --- Component map ---

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  ComponentPreview,
  InstallCommand: MdxInstallCommand,
  ComponentSource,
  CodeTabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Steps,
  Step,
  Callout: MdxCallout,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  ul: Ul,
  ol: Ol,
  a: A,
  table: Table,
  th: Th,
  td: Td,
  code: InlineCode,
};
