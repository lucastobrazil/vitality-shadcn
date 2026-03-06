import { CopyButton } from "./copy-button"

const REGISTRY_URL = process.env.NEXT_PUBLIC_REGISTRY_URL || ""

export function InstallCommand({ name }: { name: string }) {
  const command = `npx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`

  return (
    <div className="relative flex items-center gap-2 rounded-xl bg-[var(--code)] px-4 py-3 text-[var(--code-foreground)]">
      <code className="flex-1 truncate text-sm font-mono">{command}</code>
      <CopyButton
        value={command}
        className="static shrink-0 size-7 bg-transparent"
      />
    </div>
  )
}
