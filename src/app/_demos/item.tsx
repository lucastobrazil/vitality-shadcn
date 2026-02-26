"use client"

import { FileIcon, FolderIcon, ImageIcon } from "lucide-react"
import { Badge } from "@/registry/vitality/ui/badge"
import {
  Item,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemGroup,
  ItemSeparator,
} from "@/registry/vitality/ui/item"

export default function ItemDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <Item>
          <ItemMedia variant="icon"><FileIcon /></ItemMedia>
          <ItemContent>
            <ItemTitle>Document.pdf</ItemTitle>
            <ItemDescription>Uploaded 2 days ago</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="outline">PDF</Badge>
          </ItemActions>
        </Item>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Variants</p>
        <div className="space-y-2">
          <Item variant="outline">
            <ItemMedia variant="icon"><FolderIcon /></ItemMedia>
            <ItemContent>
              <ItemTitle>Projects</ItemTitle>
              <ItemDescription>3 items</ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="muted">
            <ItemMedia variant="icon"><ImageIcon /></ItemMedia>
            <ItemContent>
              <ItemTitle>Photos</ItemTitle>
              <ItemDescription>12 items</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Item group with separators</p>
        <ItemGroup className="rounded-md border">
          <Item size="sm">
            <ItemContent>
              <ItemTitle>Item one</ItemTitle>
            </ItemContent>
          </Item>
          <ItemSeparator />
          <Item size="sm">
            <ItemContent>
              <ItemTitle>Item two</ItemTitle>
            </ItemContent>
          </Item>
          <ItemSeparator />
          <Item size="sm">
            <ItemContent>
              <ItemTitle>Item three</ItemTitle>
            </ItemContent>
          </Item>
        </ItemGroup>
      </div>
    </div>
  )
}
