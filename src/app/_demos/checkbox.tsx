"use client"

import { Checkbox } from "@/registry/vitality/ui/checkbox"
import { Label } from "@/registry/vitality/ui/label"

export default function CheckboxDemo() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" defaultChecked />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">Disabled option</Label>
      </div>
    </div>
  )
}
