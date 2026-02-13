"use client"

import { Input } from "@/registry/vitality/ui/input"
import { Label } from "@/registry/vitality/ui/label"

export default function InputDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <Input type="email" placeholder="Email" />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With label and description</p>
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="Enter your username" />
          <p className="text-sm text-muted-foreground">This is your public display name.</p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">States</p>
        <div className="grid gap-3">
          <Input disabled placeholder="Disabled" />
          <Input type="password" placeholder="Password" />
          <Input type="file" />
        </div>
      </div>
    </div>
  )
}
