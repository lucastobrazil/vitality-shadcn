"use client"

import {
  InputGroup,
  InputGroupControl,
  InputGroupAddon,
} from "@/registry/vitality/ui/input-group"
import { SearchIcon, MailIcon } from "lucide-react"

export default function InputGroupDemo() {
  return (
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
      <InputGroup>
        <InputGroupAddon>
          <span className="text-xs">https://</span>
        </InputGroupAddon>
        <InputGroupControl placeholder="example.com" />
      </InputGroup>
    </div>
  )
}
