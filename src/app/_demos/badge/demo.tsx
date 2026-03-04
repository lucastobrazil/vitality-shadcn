"use client"

import { Badge } from "@/registry/vitality/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-2">
      <Badge>Badge</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  )
}
