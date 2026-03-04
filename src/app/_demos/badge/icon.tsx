"use client"

import { Badge } from "@/registry/vitality/ui/badge"
import { BadgeCheck, BookmarkIcon } from "lucide-react"

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <BadgeCheck data-icon="inline-start" />
        Verified
      </Badge>
      <Badge variant="primary">
        Bookmark
        <BookmarkIcon data-icon="inline-end" />
      </Badge>
    </div>
  )
}
