import fs from "fs";
import path from "path";
import Link from "next/link";
import { highlight } from "./_components/shiki";
import { CodeBlock } from "./_components/code-block";
import { InstallCommand } from "./_components/install-command";

export default async function GettingStarted() {
  const cssPath = path.join(process.cwd(), "src/app/globals.css");
  const metaPromptPath = path.join(
    process.cwd(),
    "src/app/metaprompt-setup.md",
  );
  const metaPromptCode = fs.readFileSync(metaPromptPath, "utf-8");
  const cssCode = fs.readFileSync(cssPath, "utf-8");
  const cssHtml = await highlight(cssCode, "css");
  const metaPromptHtml = await highlight(metaPromptCode, "css");

  const samplePrompt = "Build an app that lets users create and manage tasks";

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Getting Started</h1>
        <p className="mt-2 text-muted-foreground">
          Set up the Vitality theme and start adding components to your project.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            How to use this
          </h2>
          <p className="text-sm text-muted-foreground">
            This site is the documentation and component registry for the
            Vitality design system. Use the sidebar to browse{" "}
            <strong className="text-foreground">blocks</strong> (pre-built
            layouts like headers and navigation) and{" "}
            <strong className="text-foreground">components</strong> (individual
            UI primitives like buttons and inputs). Each page includes a live
            preview, the source code, and a one-line install command you can
            paste into your terminal. Press{" "}
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
              ⌘K
            </kbd>{" "}
            to quickly search for anything. Vitality is built on top of{" "}
            <a
              href="https://ui.shadcn.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              shadcn/ui
            </a>
            &mdash;read their docs for more on the underlying architecture and
            patterns.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-2">
            LLM-Based &quot;Automatic&quot; Setup
          </h2>
          <h3 className="text-lg  tracking-tight">1. Set up the prompt</h3>
          <p className="mt-1 text-sm text-muted-foreground mb-4">
            If you&apos;re using Claude Code or another LLM that can execute
            code, you can set up your project by running the following command
            in your terminal. This will instruct the LLM to build with Vitality
            components.
          </p>
          <CodeBlock html={metaPromptHtml} code={metaPromptCode} />
        </section>

        <section>
          <h3 className="text-lg  tracking-tight">
            2. Prompt the system to build
          </h3>
          <p className="mt-1 mb-3 text-sm text-muted-foreground">
            Now that the LLM knows to build with these components, you can start
            prompting it to build your app!
          </p>
          <CodeBlock html={samplePrompt} code={samplePrompt} />
        </section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight">Manual Setup</h2>
          <h3 className="text-lg ">1. Set up a new App</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Start with a Next.js + Tailwind CSS v4 project. If you don&apos;t
            have one yet, follow the{" "}
            <a
              href="https://ui.shadcn.com/docs/installation/next"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4"
            >
              shadcn/ui installation guide
            </a>{" "}
            first.
          </p>
        </section>

        {/* Step 2 */}
        <section>
          <h2 className="text-lg  tracking-tight">2. Add the Vitality theme</h2>
          <p className="mt-1 mb-3 text-sm text-muted-foreground">
            Replace the contents of your{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
              globals.css
            </code>{" "}
            with the following. This sets up the Vitality colour tokens, radius
            scale, and semantic typography variables for both light and dark
            modes.
          </p>
          <CodeBlock html={cssHtml} code={cssCode} />
        </section>

        {/* Step 3 */}
        <section>
          <h2 className="text-lg tracking-tight">3. Add components</h2>
          <p className="mt-1 mb-3 text-sm text-muted-foreground">
            Install individual components from the registry using the shadcn
            CLI. For example, to add the{" "}
            <Link
              href="/components/button"
              className="text-primary underline underline-offset-4"
            >
              Button
            </Link>
            :
          </p>
          <InstallCommand name="button" />
          <p className="mt-3 text-sm text-muted-foreground">
            Browse all available{" "}
            <Link
              href="/components/accordion"
              className="text-primary underline underline-offset-4"
            >
              components
            </Link>{" "}
            and{" "}
            <Link
              href="/blocks/header"
              className="text-primary underline underline-offset-4"
            >
              blocks
            </Link>{" "}
            in the sidebar, or press{" "}
            <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">
              ⌘K
            </kbd>{" "}
            to search.
          </p>
        </section>
      </div>
    </>
  );
}
