"use client"

import { BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon } from "lucide-react"
import { Button } from "@/registry/vitality/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/registry/vitality/ui/button-group"

export default function ButtonGroupDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Horizontal</p>
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Center</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With icons</p>
        <ButtonGroup>
          <Button variant="outline" size="icon"><BoldIcon /></Button>
          <Button variant="outline" size="icon"><ItalicIcon /></Button>
          <Button variant="outline" size="icon"><UnderlineIcon /></Button>
        </ButtonGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With separator</p>
        <ButtonGroup>
          <Button variant="outline" size="icon"><BoldIcon /></Button>
          <Button variant="outline" size="icon"><ItalicIcon /></Button>
          <ButtonGroupSeparator />
          <Button variant="outline" size="icon"><AlignLeftIcon /></Button>
          <Button variant="outline" size="icon"><AlignCenterIcon /></Button>
          <Button variant="outline" size="icon"><AlignRightIcon /></Button>
        </ButtonGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With text addon</p>
        <ButtonGroup>
          <ButtonGroupText>Label</ButtonGroupText>
          <Button variant="outline">Action</Button>
        </ButtonGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Vertical</p>
        <ButtonGroup orientation="vertical">
          <Button variant="outline">Top</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Bottom</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
