"use client"

import { Button } from "@/registry/vitality/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/registry/vitality/ui/button-group"

export default function ButtonGroupSeparatorDemo() {
  return (
    <ButtonGroup>
      <Button variant="primary" size="sm">
        Copy
      </Button>
      <ButtonGroupSeparator />
      <Button variant="primary" size="sm">
        Paste
      </Button>
    </ButtonGroup>
  )
}
