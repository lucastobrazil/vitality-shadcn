"use client"

import { Label } from "@/registry/vitality/ui/label"
import { Input } from "@/registry/vitality/ui/input"

export default function LabelDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Required indicator</p>
        <div className="grid gap-2">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input id="name" placeholder="John Doe" />
        </div>
      </div>
    </div>
  )
}
