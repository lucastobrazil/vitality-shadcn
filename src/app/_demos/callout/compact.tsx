"use client"

import { Callout, CalloutDescription } from "@/registry/vitality/ui/callout"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

export default function CalloutCompactDemo() {
  return (
    <div className="space-y-2">
      <Callout size="compact">
        <InfoIcon />
        <CalloutDescription>This is a compact muted callout.</CalloutDescription>
      </Callout>
      <Callout size="compact" severity="destructive">
        <XCircleIcon />
        <CalloutDescription>Something went wrong.</CalloutDescription>
      </Callout>
      <Callout size="compact" severity="warning">
        <AlertTriangleIcon />
        <CalloutDescription>Proceed with caution.</CalloutDescription>
      </Callout>
      <Callout size="compact" severity="success">
        <CheckCircleIcon />
        <CalloutDescription>Operation completed.</CalloutDescription>
      </Callout>
      <Callout size="compact" severity="info">
        <InfoIcon />
        <CalloutDescription>New update available.</CalloutDescription>
      </Callout>
      <Callout size="compact" severity="brand">
        <InfoIcon />
        <CalloutDescription>Try our premium features.</CalloutDescription>
      </Callout>
    </div>
  )
}
