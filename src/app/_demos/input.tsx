"use client"

import { Input } from "@/registry/vitality/ui/input"

export default function InputDemo() {
  return (
    <div className="grid gap-3 max-w-sm">
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Input disabled placeholder="Disabled" />
    </div>
  )
}
