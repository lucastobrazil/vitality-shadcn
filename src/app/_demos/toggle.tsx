"use client"

import { Toggle } from "@/registry/vitality/ui/toggle"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

export default function ToggleDemo() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <BoldIcon className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle italic">
        <ItalicIcon className="size-4" />
      </Toggle>
      <Toggle aria-label="Toggle underline">
        <UnderlineIcon className="size-4" />
      </Toggle>
    </div>
  )
}
