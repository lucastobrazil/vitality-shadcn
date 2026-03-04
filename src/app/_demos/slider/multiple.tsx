"use client"

import { Slider } from "@/registry/vitality/ui/slider"

export default function SliderMultiple() {
  return (
    <Slider
      defaultValue={[10, 20, 70]}
      max={100}
      step={10}
      className="mx-auto w-full max-w-xs"
    />
  )
}
