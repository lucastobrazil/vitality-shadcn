"use client"

import { DirectionProvider, useDirection } from "@/registry/vitality/ui/direction"

function DirectionDisplay() {
  const direction = useDirection()
  return <span className="text-sm">Current direction: <strong>{direction}</strong></span>
}

export default function DirectionDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">LTR (default)</p>
        <DirectionProvider direction="ltr">
          <div className="rounded-md border p-4">
            <DirectionDisplay />
          </div>
        </DirectionProvider>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">RTL</p>
        <DirectionProvider direction="rtl">
          <div className="rounded-md border p-4">
            <DirectionDisplay />
          </div>
        </DirectionProvider>
      </div>
    </div>
  )
}
