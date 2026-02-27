"use client"

import { Badge } from "@/registry/vitality/ui/badge"
import { Spinner } from "@/registry/vitality/ui/spinner"

export default function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner data-icon="inline-start" />
        Syncing
      </Badge>
      <Badge variant="neutral">
        <Spinner data-icon="inline-start" />
        Updating
      </Badge>
      <Badge variant="primary">
        <Spinner data-icon="inline-start" />
        Processing
      </Badge>
    </div>
  )
}
