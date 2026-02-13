"use client"

import { Switch } from "@/registry/vitality/ui/switch"
import { Label } from "@/registry/vitality/ui/label"

export default function SwitchDemo() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="notifications" defaultChecked />
        <Label htmlFor="notifications">Notifications</Label>
      </div>
    </div>
  )
}
