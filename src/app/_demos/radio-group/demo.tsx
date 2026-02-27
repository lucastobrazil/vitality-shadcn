"use client"

import { RadioGroup, RadioGroupItem } from "@/registry/vitality/ui/radio-group"
import { Label } from "@/registry/vitality/ui/label"

export default function RadioGroupDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="r1" />
            <Label htmlFor="r1">Default</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="comfortable" id="r2" />
            <Label htmlFor="r2">Comfortable</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="compact" id="r3" />
            <Label htmlFor="r3">Compact</Label>
          </div>
        </RadioGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With descriptions</p>
        <RadioGroup defaultValue="free">
          {[
            { value: "free", label: "Free", desc: "Get started with basic features" },
            { value: "pro", label: "Pro", desc: "Advanced features for professionals" },
            { value: "team", label: "Team", desc: "Collaboration tools for teams" },
          ].map((plan) => (
            <div key={plan.value} className="flex items-start gap-2">
              <RadioGroupItem value={plan.value} id={plan.value} className="mt-0.5" />
              <div>
                <Label htmlFor={plan.value}>{plan.label}</Label>
                <p className="text-sm text-muted-foreground">{plan.desc}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <RadioGroup defaultValue="one" disabled>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="one" id="d1" />
            <Label htmlFor="d1">Option one</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="two" id="d2" />
            <Label htmlFor="d2">Option two</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
