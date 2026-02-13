"use client"

import { Button } from "@/registry/vitality/ui/button"
import { Spinner } from "@/registry/vitality/ui/spinner"
import { MailIcon, ChevronRightIcon } from "lucide-react"

export default function ButtonDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Variants</p>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="primary">Primary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Sizes</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With icons</p>
        <div className="flex flex-wrap gap-3">
          <Button><MailIcon /> Icon start</Button>
          <Button>Icon end <ChevronRightIcon /></Button>
          <Button size="icon"><MailIcon /></Button>
          <Button size="icon-sm"><MailIcon /></Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">States</p>
        <div className="flex flex-wrap gap-3">
          <Button disabled>Disabled</Button>
          <Button variant="primary" disabled><Spinner size="sm" color="primary" /> Loading</Button>
        </div>
      </div>
    </div>
  )
}
