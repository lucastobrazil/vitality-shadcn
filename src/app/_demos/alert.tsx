"use client"

import { Alert, AlertTitle, AlertDescription } from "@/registry/vitality/ui/alert"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon } from "lucide-react"

export default function AlertDemo() {
  return (
    <div className="space-y-3">
      <Alert>
        <InfoIcon className="size-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
      <Alert severity="destructive">
        <AlertTriangleIcon className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
    </div>
  )
}
