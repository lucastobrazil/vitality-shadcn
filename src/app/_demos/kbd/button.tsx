"use client"

import { Button } from "@/registry/vitality/ui/button"
import { Kbd } from "@/registry/vitality/ui/kbd"

export default function KbdButton() {
  return (
    <Button variant="outline">
      Accept{" "}
      <Kbd data-icon="inline-end" className="translate-x-0.5">
        ⏎
      </Kbd>
    </Button>
  )
}
