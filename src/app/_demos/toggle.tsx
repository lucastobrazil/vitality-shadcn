"use client"

import { Toggle } from "@/registry/vitality/ui/toggle"
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react"

export default function ToggleDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic with icon</p>
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
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Outline variant</p>
        <div className="flex gap-2">
          <Toggle variant="outline" aria-label="Toggle bold">
            <BoldIcon className="size-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle italic">
            <ItalicIcon className="size-4" />
          </Toggle>
          <Toggle variant="outline" aria-label="Toggle underline">
            <UnderlineIcon className="size-4" />
          </Toggle>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With text</p>
        <div className="flex gap-2">
          <Toggle aria-label="Toggle bold">
            <BoldIcon className="size-4" /> Bold
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <ItalicIcon className="size-4" /> Italic
          </Toggle>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <Toggle disabled aria-label="Toggle bold">
          <BoldIcon className="size-4" />
        </Toggle>
      </div>
    </div>
  )
}
