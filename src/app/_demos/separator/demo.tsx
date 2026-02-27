"use client"

import { Separator } from "@/registry/vitality/ui/separator"

export default function SeparatorDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Horizontal</p>
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
          <p className="text-sm text-muted-foreground">An open-source UI component library.</p>
        </div>
        <Separator className="my-4" />
        <p className="text-sm">Content below the separator.</p>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Vertical</p>
        <div className="flex h-5 items-center gap-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    </div>
  )
}
