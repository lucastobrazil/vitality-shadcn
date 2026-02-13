"use client"

import { Label } from "@/registry/vitality/ui/label"
import { Input } from "@/registry/vitality/ui/input"

export default function LabelDemo() {
  return (
    <div className="grid gap-2 max-w-sm">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="you@example.com" />
    </div>
  )
}
