"use client"

import { Button } from "@/registry/vitality/ui/button"
import { Spinner } from "@/registry/vitality/ui/spinner"

export default function ButtonSpinner() {
  return (
    <div className="flex gap-2">
      <Button variant="outline" disabled>
        <Spinner data-icon="inline-start" />
        Generating
      </Button>
      <Button variant="primary" disabled>
        Downloading
        <Spinner data-icon="inline-start" />
      </Button>
    </div>
  )
}
