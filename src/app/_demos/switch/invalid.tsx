"use client"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/registry/vitality/ui/field"
import { Switch } from "@/registry/vitality/ui/switch"

export default function SwitchInvalid() {
  return (
    <Field orientation="horizontal" className="max-w-sm" data-invalid>
      <FieldContent>
        <FieldLabel htmlFor="switch-terms">
          Accept terms and conditions
        </FieldLabel>
        <FieldDescription>
          You must accept the terms and conditions to continue.
        </FieldDescription>
      </FieldContent>
      <Switch id="switch-terms" aria-invalid />
    </Field>
  )
}
