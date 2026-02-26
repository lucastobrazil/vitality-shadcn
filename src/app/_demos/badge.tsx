"use client"

import { Badge } from "@/registry/vitality/ui/badge"
import { CheckCircleIcon, AlertTriangleIcon, InfoIcon, XCircleIcon, SparklesIcon } from "lucide-react"

export default function BadgeDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Variants</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="destructive"><XCircleIcon /> Destructive</Badge>
          <Badge variant="success"><CheckCircleIcon /> Success</Badge>
          <Badge variant="warning"><AlertTriangleIcon /> Warning</Badge>
          <Badge variant="info"><InfoIcon /> Info</Badge>
          <Badge variant="brand"><SparklesIcon /> Brand</Badge>
        </div>
      </div>
    </div>
  )
}
