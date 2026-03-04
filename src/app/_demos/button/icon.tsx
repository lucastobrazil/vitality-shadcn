"use client"

import { Button } from "@/registry/vitality/ui/button"
import { CircleFadingArrowUpIcon } from "lucide-react"

export default function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}
