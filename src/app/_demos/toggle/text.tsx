"use client"

import { Toggle } from "@/registry/vitality/ui/toggle"
import { ItalicIcon } from "lucide-react"

export default function ToggleText() {
  return (
    <Toggle aria-label="Toggle italic">
      <ItalicIcon />
      Italic
    </Toggle>
  )
}
