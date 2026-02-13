"use client"

import { Button } from "@/registry/vitality/ui/button"
import { Spinner } from "@/registry/vitality/ui/spinner"
import { MailIcon, ChevronRightIcon, PlusIcon } from "lucide-react"

export default function ButtonDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Variants</p>
        <div className="flex flex-wrap items-center gap-3">
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
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Icon</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-xs"><PlusIcon /></Button>
          <Button size="icon-sm"><PlusIcon /></Button>
          <Button size="icon"><PlusIcon /></Button>
          <Button size="icon-lg"><PlusIcon /></Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Rounded</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="icon-xs" className="rounded-full"><PlusIcon /></Button>
          <Button size="icon-sm" className="rounded-full"><PlusIcon /></Button>
          <Button size="icon" className="rounded-full"><PlusIcon /></Button>
          <Button size="icon-lg" className="rounded-full"><PlusIcon /></Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With icons</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button><MailIcon /> Icon start</Button>
          <Button>Icon end <ChevronRightIcon /></Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Loading</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled><Spinner size="sm" /> Loading</Button>
          <Button variant="primary" disabled><Spinner size="sm" color="primary" /> Saving</Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Default</Button>
          <Button variant="primary" disabled>Primary</Button>
          <Button variant="destructive" disabled>Destructive</Button>
          <Button variant="outline" disabled>Outline</Button>
        </div>
      </div>
    </div>
  )
}
