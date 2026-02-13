"use client"

import { ScrollArea, ScrollBar } from "@/registry/vitality/ui/scroll-area"
import { Separator } from "@/registry/vitality/ui/separator"

const tags = Array.from({ length: 50 }).map((_, i) => `v1.2.0-beta.${i + 1}`)

const artworks = [
  { title: "Sunset Over Mountains", artist: "Jane Cooper" },
  { title: "Ocean Breeze", artist: "Wade Wilson" },
  { title: "City Lights", artist: "Arlene McCoy" },
  { title: "Autumn Forest", artist: "Devon Lane" },
  { title: "Morning Dew", artist: "Courtney Henry" },
  { title: "Starry Night", artist: "Cameron Lee" },
  { title: "Golden Fields", artist: "Brooklyn Davis" },
]

export default function ScrollAreaDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Vertical</p>
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
              <div key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Horizontal</p>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max gap-4 p-4">
            {artworks.map((art) => (
              <div key={art.title} className="w-40 shrink-0 space-y-1">
                <div className="h-24 rounded-md bg-muted" />
                <p className="text-sm font-medium">{art.title}</p>
                <p className="text-xs text-muted-foreground">{art.artist}</p>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
