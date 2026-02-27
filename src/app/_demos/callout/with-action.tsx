"use client"

import { Callout, CalloutTitle, CalloutDescription, CalloutAction } from "@/registry/vitality/ui/callout"
import { Button } from "@/registry/vitality/ui/button"
import { InfoIcon, XIcon } from "lucide-react"

export default function CalloutWithActionDemo() {
  return (
    <Callout severity="info">
      <InfoIcon className="size-4" />
      <CalloutTitle>New version available</CalloutTitle>
      <CalloutDescription>Version 2.0 has been released with new features and improvements.</CalloutDescription>
      <CalloutAction>
        <Button variant="ghost" size="icon-xs">
          <XIcon className="size-3" />
        </Button>
      </CalloutAction>
    </Callout>
  )
}
