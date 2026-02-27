"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/vitality/ui/field"
import { Input } from "@/registry/vitality/ui/input"

export default function InputFile() {
  return (
    <Field>
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
      <FieldDescription>Select a picture to upload.</FieldDescription>
    </Field>
  )
}
