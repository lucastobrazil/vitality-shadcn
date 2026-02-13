"use client"

import { AspectRatio } from "@/registry/vitality/ui/aspect-ratio"

export default function AspectRatioDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">16:9</p>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border bg-muted">
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            16:9
          </div>
        </AspectRatio>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">4:3</p>
        <AspectRatio ratio={4 / 3} className="overflow-hidden rounded-lg border bg-muted">
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            4:3
          </div>
        </AspectRatio>
      </div>
      <div className="max-w-[200px]">
        <p className="mb-2 text-sm font-medium">1:1 (Square)</p>
        <AspectRatio ratio={1} className="overflow-hidden rounded-lg border bg-muted">
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            1:1
          </div>
        </AspectRatio>
      </div>
    </div>
  )
}
