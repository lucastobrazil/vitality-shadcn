"use client"

import { Button } from "@/registry/vitality/ui/button"
import { MailIcon, Loader2Icon } from "lucide-react"

export default function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button>
        <MailIcon /> With Icon
      </Button>
      <Button disabled>
        <Loader2Icon className="animate-spin" /> Loading
      </Button>
    </div>
  )
}
