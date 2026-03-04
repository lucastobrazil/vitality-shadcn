"use client";

import { Field, FieldLabel } from "@/registry/vitality/ui/field";
import { Switch } from "@/registry/vitality/ui/switch";
import React from "react";

export default function FieldSwitch() {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <Field orientation="horizontal" className="w-fit">
      <FieldLabel htmlFor="2fa">Multi-factor authentication</FieldLabel>
      <Switch id="2fa" checked={isChecked} onCheckedChange={setIsChecked} />
    </Field>
  );
}
