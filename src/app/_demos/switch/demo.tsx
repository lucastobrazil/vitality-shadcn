"use client"

import { Switch } from "@/registry/vitality/ui/switch"
import { Label } from "@/registry/vitality/ui/label"

export default function SwitchDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic with label</p>
        <div className="flex items-center gap-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With description</p>
        <div className="flex items-start gap-2">
          <Switch id="marketing" className="mt-0.5" defaultChecked />
          <div>
            <Label htmlFor="marketing">Marketing emails</Label>
            <p className="text-sm text-muted-foreground">Receive emails about new products.</p>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <div className="flex items-center gap-2">
          <Switch id="disabled" disabled />
          <Label htmlFor="disabled">Disabled</Label>
        </div>
      </div>
    </div>
  )
}
