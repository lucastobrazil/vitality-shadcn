"use client"

import { Callout, CalloutTitle, CalloutDescription } from "@/registry/vitality/ui/callout"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

export default function CalloutDemo() {
  return (
    <div className="space-y-3">
      <Callout>
        <InfoIcon className="size-4" />
        <CalloutTitle>Heads up!</CalloutTitle>
        <CalloutDescription>You can add components to your app using the CLI.</CalloutDescription>
      </Callout>
      <Callout severity="destructive">
        <XCircleIcon className="size-4" />
        <CalloutTitle>Error</CalloutTitle>
        <CalloutDescription>Your session has expired. Please log in again.</CalloutDescription>
      </Callout>
      <Callout severity="warning">
        <AlertTriangleIcon className="size-4" />
        <CalloutTitle>Warning</CalloutTitle>
        <CalloutDescription>Your storage is almost full. Upgrade your plan.</CalloutDescription>
      </Callout>
      <Callout severity="success">
        <CheckCircleIcon className="size-4" />
        <CalloutTitle>Success</CalloutTitle>
        <CalloutDescription>Your changes have been saved.</CalloutDescription>
      </Callout>
      <Callout severity="info">
        <InfoIcon className="size-4" />
        <CalloutTitle>Info</CalloutTitle>
        <CalloutDescription>A new version is available.</CalloutDescription>
      </Callout>
      <Callout severity="brand">
        <InfoIcon className="size-4" />
        <CalloutTitle>Brand</CalloutTitle>
        <CalloutDescription>Check out our new premium features.</CalloutDescription>
      </Callout>
    </div>
  )
}
