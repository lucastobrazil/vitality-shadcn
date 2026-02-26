"use client"

import { Button } from "@/registry/vitality/ui/button"
import { GitBranchIcon } from "lucide-react"

export default function ButtonWithIcon() {
  return (
    <Button variant="outline" size="sm">
      <GitBranchIcon /> New Branch
    </Button>
  )
}
