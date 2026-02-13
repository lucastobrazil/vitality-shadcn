"use client"

import { Alert, AlertTitle, AlertDescription } from "@/registry/vitality/ui/alert"
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, XCircleIcon } from "lucide-react"

export default function AlertDemo() {
  return (
    <div className="space-y-3">
      <Alert>
        <InfoIcon className="size-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
      </Alert>
      <Alert severity="destructive">
        <XCircleIcon className="size-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
      </Alert>
      <Alert severity="warning">
        <AlertTriangleIcon className="size-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Your storage is almost full. Upgrade your plan.</AlertDescription>
      </Alert>
      <Alert severity="success">
        <CheckCircleIcon className="size-4" />
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </Alert>
      <Alert severity="info">
        <InfoIcon className="size-4" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>A new version is available.</AlertDescription>
      </Alert>
      <Alert severity="brand">
        <InfoIcon className="size-4" />
        <AlertTitle>Brand</AlertTitle>
        <AlertDescription>Check out our new premium features.</AlertDescription>
      </Alert>
    </div>
  )
}
