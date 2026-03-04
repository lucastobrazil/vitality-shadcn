"use client"

import { Textarea } from "@/registry/vitality/ui/textarea"
import { Label } from "@/registry/vitality/ui/label"

export default function TextareaDemo() {
  return (
    <div className="space-y-6 max-w-sm">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <Textarea placeholder="Type your message here." />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With label</p>
        <div className="grid gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" />
          <p className="text-sm text-muted-foreground">Max 160 characters.</p>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <Textarea disabled placeholder="Disabled textarea" />
      </div>
    </div>
  )
}
