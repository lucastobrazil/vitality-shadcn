"use client"

import { StatusBadge } from "@/registry/vitality/ui/status-badge"
import { CheckCircleIcon, AlertTriangleIcon, InfoIcon, XCircleIcon, SparklesIcon } from "lucide-react"

export default function StatusBadgeDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Severity variants</p>
        <div className="flex flex-wrap gap-2">
          <StatusBadge severity="success"><CheckCircleIcon /> Active</StatusBadge>
          <StatusBadge severity="warning"><AlertTriangleIcon /> Pending</StatusBadge>
          <StatusBadge severity="destructive"><XCircleIcon /> Failed</StatusBadge>
          <StatusBadge severity="info"><InfoIcon /> Info</StatusBadge>
          <StatusBadge severity="brand"><SparklesIcon /> Brand</StatusBadge>
          <StatusBadge severity="muted">Muted</StatusBadge>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Color variants</p>
        <div className="flex flex-wrap gap-2">
          <StatusBadge>Default</StatusBadge>
          <StatusBadge color="neutral">Neutral</StatusBadge>
        </div>
      </div>
    </div>
  )
}
