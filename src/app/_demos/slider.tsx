"use client"

import { Slider } from "@/registry/vitality/ui/slider"

export default function SliderDemo() {
  return (
    <div className="max-w-sm space-y-6">
      <Slider defaultValue={[33]} max={100} step={1} />
      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  )
}
