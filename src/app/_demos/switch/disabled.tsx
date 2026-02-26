"use client"

import { Field, FieldLabel } from "@/registry/vitality/ui/field"
import { Switch } from "@/registry/vitality/ui/switch"

export default function SwitchDisabled() {
  return (
    <Field orientation="horizontal" data-disabled className="w-fit">
      <Switch id="switch-disabled-unchecked" disabled />
      <FieldLabel htmlFor="switch-disabled-unchecked">Disabled</FieldLabel>
    </Field>
  )
}
