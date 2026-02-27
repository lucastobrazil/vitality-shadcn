"use client"

import { Callout, CalloutTitle, CalloutDescription } from "@/registry/vitality/ui/callout"
import { InfoIcon, AlertTriangleIcon } from "lucide-react"

export default function CalloutBlockCompactDemo() {
  return (
    <div className="space-y-2">
      <Callout size="blockCompact">
        <InfoIcon />
        <CalloutTitle>Note:</CalloutTitle>
        <CalloutDescription>Title and description are displayed inline.</CalloutDescription>
      </Callout>
      <Callout size="blockCompact" severity="warning">
        <AlertTriangleIcon />
        <CalloutTitle>Caution:</CalloutTitle>
        <CalloutDescription>This action cannot be undone.</CalloutDescription>
      </Callout>
    </div>
  )
}
