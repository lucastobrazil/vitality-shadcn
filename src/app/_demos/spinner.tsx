"use client"

import { Spinner } from "@/registry/vitality/ui/spinner"

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <Spinner size="xl" color="primary" />
    </div>
  )
}
