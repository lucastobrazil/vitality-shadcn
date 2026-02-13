"use client"

import { StatusBadge } from "@/registry/vitality/ui/status-badge"
import { CheckCircleIcon, AlertTriangleIcon, InfoIcon, XCircleIcon, SparklesIcon } from "lucide-react"

export default function StatusBadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge severity="success">
        <CheckCircleIcon /> Active
      </StatusBadge>
      <StatusBadge severity="warning">
        <AlertTriangleIcon /> Pending
      </StatusBadge>
      <StatusBadge severity="destructive">
        <XCircleIcon /> Failed
      </StatusBadge>
      <StatusBadge severity="info">
        <InfoIcon /> Info
      </StatusBadge>
      <StatusBadge severity="brand">
        <SparklesIcon /> Brand
      </StatusBadge>
      <StatusBadge severity="muted">Muted</StatusBadge>
    </div>
  )
}
