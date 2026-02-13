"use client"

import { useState } from "react"
import { CopyIcon, CheckIcon } from "lucide-react"
import { Button } from "@/registry/vitality/ui/button"

const REGISTRY_URL =
  process.env.NEXT_PUBLIC_REGISTRY_URL || "https://shaddo-dayoff.vercel.app"

export function InstallCommand({ name }: { name: string }) {
  const [copied, setCopied] = useState(false)
  const command = `npx shadcn@latest add ${REGISTRY_URL}/r/${name}.json`

  const copy = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/30 px-4 py-3">
      <code className="flex-1 truncate text-sm font-mono">{command}</code>
      <Button variant="ghost" size="icon-xs" onClick={copy}>
        {copied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
      </Button>
    </div>
  )
}
