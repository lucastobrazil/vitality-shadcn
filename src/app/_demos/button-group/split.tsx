"use client"

import { Button } from "@/registry/vitality/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/vitality/ui/button-group"
import { PlusIcon } from "lucide-react"

export default function ButtonGroupSplit() {
  return (
    <ButtonGroup>
      <Button variant="primary">Button</Button>
      <ButtonGroupSeparator />
      <Button size="icon" variant="primary">
        <PlusIcon />
      </Button>
    </ButtonGroup>
  )
}
