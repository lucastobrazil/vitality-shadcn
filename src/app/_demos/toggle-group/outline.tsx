"use client"

import { ToggleGroup, ToggleGroupItem } from "@/registry/vitality/ui/toggle-group"

export default function ToggleGroupOutline() {
  return (
    <ToggleGroup variant="outline" type="single" defaultValue="all">
      <ToggleGroupItem value="all" aria-label="Toggle all">
        All
      </ToggleGroupItem>
      <ToggleGroupItem value="missed" aria-label="Toggle missed">
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
