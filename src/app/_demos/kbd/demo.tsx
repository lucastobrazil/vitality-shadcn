"use client"

import { CommandIcon } from "lucide-react"
import { Kbd, KbdGroup } from "@/registry/vitality/ui/kbd"

export default function KbdDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Single keys</p>
        <div className="flex flex-wrap items-center gap-3">
          <Kbd>K</Kbd>
          <Kbd>Enter</Kbd>
          <Kbd>Tab</Kbd>
          <Kbd>Shift</Kbd>
          <Kbd>Esc</Kbd>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Key combinations</p>
        <div className="flex flex-wrap items-center gap-3">
          <KbdGroup>
            <Kbd><CommandIcon /></Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>C</Kbd>
          </KbdGroup>
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </div>
      </div>
    </div>
  )
}
