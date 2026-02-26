"use client"

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
} from "@/registry/vitality/ui/input-group"
import { SearchIcon, MailIcon, DollarSignIcon, LinkIcon } from "lucide-react"

export default function InputGroupDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">With icon</p>
        <div className="grid gap-3 max-w-sm">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search..." />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
            <InputGroupInput type="email" placeholder="you@example.com" />
          </InputGroup>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With text addon</p>
        <div className="grid gap-3 max-w-sm">
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>https://</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput placeholder="example.com" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <DollarSignIcon />
            </InputGroupAddon>
            <InputGroupInput type="number" placeholder="0.00" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>USD</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Trailing addon</p>
        <div className="grid gap-3 max-w-sm">
          <InputGroup>
            <InputGroupInput placeholder="Paste a link..." />
            <InputGroupAddon align="inline-end">
              <LinkIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  )
}
