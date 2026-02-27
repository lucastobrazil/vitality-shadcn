"use client"

import { ToggleGroup, ToggleGroupItem } from "@/registry/vitality/ui/toggle-group"
import { BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from "lucide-react"

export default function ToggleGroupDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Single selection</p>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeftIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenterIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRightIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Multiple selection</p>
        <ToggleGroup type="multiple" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <BoldIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <ItalicIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <UnderlineIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Outline variant</p>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeftIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenterIcon className="size-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRightIcon className="size-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  )
}
