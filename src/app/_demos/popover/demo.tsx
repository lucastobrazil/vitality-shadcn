"use client"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/registry/vitality/ui/popover"
import { Button } from "@/registry/vitality/ui/button"
import { Input } from "@/registry/vitality/ui/input"
import { Label } from "@/registry/vitality/ui/label"

export default function PopoverDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic with form</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input id="width" defaultValue="100%" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Height</Label>
                  <Input id="height" defaultValue="25px" className="col-span-2 h-8" />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="max-width">Max. width</Label>
                  <Input id="max-width" defaultValue="300px" className="col-span-2 h-8" />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Different alignments</p>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Start</Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-48">
              <p className="text-sm">Aligned to start</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">Center</Button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-48">
              <p className="text-sm">Aligned to center</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">End</Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-48">
              <p className="text-sm">Aligned to end</p>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
