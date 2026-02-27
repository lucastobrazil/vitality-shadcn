"use client"

import { Button } from "@/registry/vitality/ui/button"
import { ButtonGroup } from "@/registry/vitality/ui/button-group"
import { Input } from "@/registry/vitality/ui/input"
import { SearchIcon } from "lucide-react"

export default function ButtonGroupInput() {
  return (
    <ButtonGroup>
      <Input placeholder="Search..." />
      <Button variant="outline" aria-label="Search">
        <SearchIcon />
      </Button>
    </ButtonGroup>
  )
}
