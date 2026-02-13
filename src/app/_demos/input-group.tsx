"use client"

import {
  InputGroup,
  InputGroupControl,
  InputGroupAddon,
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
            <InputGroupControl placeholder="Search..." />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
            <InputGroupControl type="email" placeholder="you@example.com" />
          </InputGroup>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With text addon</p>
        <div className="grid gap-3 max-w-sm">
          <InputGroup>
            <InputGroupAddon>
              <span className="text-xs">https://</span>
            </InputGroupAddon>
            <InputGroupControl placeholder="example.com" />
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <DollarSignIcon />
            </InputGroupAddon>
            <InputGroupControl type="number" placeholder="0.00" />
            <InputGroupAddon>
              <span className="text-xs">USD</span>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Trailing addon</p>
        <div className="grid gap-3 max-w-sm">
          <InputGroup>
            <InputGroupControl placeholder="Paste a link..." />
            <InputGroupAddon>
              <LinkIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </div>
  )
}
