import { codeToHtml } from "shiki"
import type { ShikiTransformer } from "shiki"

export const transformers = [
  {
    pre(node: any) {
      node.properties["class"] =
        "no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 !bg-transparent"
    },
    code(node: any) {
      if (node.tagName === "code") {
        const raw = this.source
        const meta = (this.options?.meta as any)?.__raw as string | undefined
        node.properties["__raw__"] = raw
        if (!meta?.includes("hideLineNumbers")) {
          node.properties["data-line-numbers"] = ""
        }

        if (raw.startsWith("npm install")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npm install", "yarn add")
          node.properties["__pnpm__"] = raw.replace("npm install", "pnpm add")
          node.properties["__bun__"] = raw.replace("npm install", "bun add")
        }

        if (raw.startsWith("npx create-")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace(
            "npx create-",
            "yarn create "
          )
          node.properties["__pnpm__"] = raw.replace(
            "npx create-",
            "pnpm create "
          )
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        }

        if (raw.startsWith("npx")) {
          node.properties["__npm__"] = raw
          node.properties["__yarn__"] = raw.replace("npx", "yarn")
          node.properties["__pnpm__"] = raw.replace("npx", "pnpm dlx")
          node.properties["__bun__"] = raw.replace("npx", "bunx --bun")
        }
      }
    },
    line(node: any) {
      node.properties["data-line"] = ""
    },
  },
] as ShikiTransformer[]

export async function highlight(
  code: string,
  lang: string = "tsx"
): Promise<string> {
  return codeToHtml(code, {
    lang,
    themes: {
      dark: "github-dark-default",
      light: "github-light-default",
    },
    transformers,
  })
}
