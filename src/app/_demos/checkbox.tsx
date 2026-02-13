"use client"

import { Checkbox } from "@/registry/vitality/ui/checkbox"
import { Label } from "@/registry/vitality/ui/label"

export default function CheckboxDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic with label</p>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With description</p>
        <div className="flex items-start gap-2">
          <Checkbox id="marketing" className="mt-0.5" />
          <div>
            <Label htmlFor="marketing">Marketing emails</Label>
            <p className="text-sm text-muted-foreground">Receive emails about new products and features.</p>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Checkbox group</p>
        <div className="space-y-2">
          {["Recents", "Home", "Applications", "Desktop"].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Checkbox id={item} defaultChecked={item === "Home"} />
              <Label htmlFor={item}>{item}</Label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled">Disabled option</Label>
        </div>
      </div>
    </div>
  )
}
