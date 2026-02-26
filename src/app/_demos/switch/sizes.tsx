"use client"

import { Field, FieldGroup, FieldLabel } from "@/registry/vitality/ui/field"
import { Switch } from "@/registry/vitality/ui/switch"

export default function SwitchSizes() {
  return (
    <FieldGroup className="w-full max-w-[10rem]">
      <Field orientation="horizontal">
        <Switch id="switch-size-sm" className="scale-75" />
        <FieldLabel htmlFor="switch-size-sm">Small</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch id="switch-size-default" />
        <FieldLabel htmlFor="switch-size-default">Default</FieldLabel>
      </Field>
    </FieldGroup>
  )
}
