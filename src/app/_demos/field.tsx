"use client"

import { Input } from "@/registry/vitality/ui/input"
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldContent,
} from "@/registry/vitality/ui/field"

export default function FieldDemo() {
  return (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="mb-2 text-sm font-medium">Vertical (default)</p>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <FieldContent>
            <Input type="email" placeholder="you@example.com" />
            <FieldDescription>We will never share your email.</FieldDescription>
          </FieldContent>
        </Field>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Horizontal</p>
        <Field orientation="horizontal">
          <FieldLabel>Username</FieldLabel>
          <FieldContent>
            <Input placeholder="johndoe" />
          </FieldContent>
        </Field>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With error</p>
        <Field>
          <FieldLabel>Password</FieldLabel>
          <FieldContent>
            <Input type="password" aria-invalid="true" />
            <FieldError>Password must be at least 8 characters.</FieldError>
          </FieldContent>
        </Field>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Field group</p>
        <FieldGroup>
          <Field>
            <FieldLabel>First name</FieldLabel>
            <FieldContent>
              <Input placeholder="John" />
            </FieldContent>
          </Field>
          <Field>
            <FieldLabel>Last name</FieldLabel>
            <FieldContent>
              <Input placeholder="Doe" />
            </FieldContent>
          </Field>
        </FieldGroup>
      </div>
    </div>
  )
}
