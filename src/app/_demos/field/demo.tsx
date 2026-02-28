"use client";

import { Button } from "@/registry/vitality/ui/button";
import { Checkbox } from "@/registry/vitality/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/registry/vitality/ui/field";
import { Input } from "@/registry/vitality/ui/input";

export default function FieldDemo() {
  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="field-card-name">Name on Card</FieldLabel>
                <Input
                  id="field-card-name"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="field-card-number">Card Number</FieldLabel>
                <Input
                  id="field-card-number"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="field-exp-month">Month</FieldLabel>
                  <Input id="field-exp-month" placeholder="MM" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="field-exp-year">Year</FieldLabel>
                  <Input id="field-exp-year" placeholder="YYYY" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="field-cvv">CVV</FieldLabel>
                  <Input id="field-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="field-same-shipping" defaultChecked />
                <FieldLabel
                  htmlFor="field-same-shipping"
                  className="font-normal"
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="button">Cancel</Button>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
