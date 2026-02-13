"use client"

import { useState } from "react"
import { Slider } from "@/registry/vitality/ui/slider"

export default function SliderDemo() {
  const [value, setValue] = useState([33])
  const [range, setRange] = useState([25, 75])

  return (
    <div className="space-y-6 max-w-sm">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With label</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Volume</span>
            <span className="text-muted-foreground">{value[0]}%</span>
          </div>
          <Slider value={value} onValueChange={setValue} max={100} step={1} />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Range (two thumbs)</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Price range</span>
            <span className="text-muted-foreground">${range[0]} - ${range[1]}</span>
          </div>
          <Slider value={range} onValueChange={setRange} max={100} step={1} />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <Slider defaultValue={[60]} max={100} step={1} disabled />
      </div>
    </div>
  )
}
