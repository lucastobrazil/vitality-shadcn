"use client"

import { Badge } from "@/registry/vitality/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  )
}
