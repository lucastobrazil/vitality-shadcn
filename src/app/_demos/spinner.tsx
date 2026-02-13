"use client"

import { Spinner } from "@/registry/vitality/ui/spinner"
import { Button } from "@/registry/vitality/ui/button"

export default function SpinnerDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Sizes</p>
        <div className="flex items-center gap-6">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" />
          <Spinner size="xl" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Colors</p>
        <div className="flex items-center gap-6">
          <Spinner />
          <Spinner color="primary" />
          <Spinner color="secondary" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With button (loading state)</p>
        <Button variant="primary" disabled>
          <Spinner size="sm" /> Saving...
        </Button>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Centered loading</p>
        <div className="flex h-32 items-center justify-center rounded-lg border">
          <Spinner size="lg" color="primary" />
        </div>
      </div>
    </div>
  )
}
