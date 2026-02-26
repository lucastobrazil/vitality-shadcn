"use client"

import { Badge } from "@/registry/vitality/ui/badge"
import { Spinner } from "@/registry/vitality/ui/spinner"

export default function BadgeWithSpinner() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="destructive">
        <Spinner data-icon="inline-start" />
        Deleting
      </Badge>
      <Badge>
        Generating
        <Spinner data-icon="inline-end" />
      </Badge>
    </div>
  )
}
