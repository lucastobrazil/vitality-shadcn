import { createHighlighter, type Highlighter } from "shiki"

let highlighter: Highlighter | null = null

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "css", "bash"],
    })
  }
  return highlighter
}

export async function highlight(code: string, lang: "tsx" | "css" | "bash" = "tsx"): Promise<string> {
  const h = await getHighlighter()
  return h.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark",
    },
  })
}
