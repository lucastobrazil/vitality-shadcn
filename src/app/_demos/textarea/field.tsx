"use client"

import { Field, FieldDescription, FieldLabel } from "@/registry/vitality/ui/field"
import { Textarea } from "@/registry/vitality/ui/textarea"

export default function TextareaField() {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">Message</FieldLabel>
      <FieldDescription>Enter your message below.</FieldDescription>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </Field>
  )
}
