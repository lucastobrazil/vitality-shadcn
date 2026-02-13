"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/registry/vitality/ui/progress"

export default function ProgressDemo() {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <Progress value={progress} />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With label</p>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span className="text-muted-foreground">{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Complete</p>
        <Progress value={100} />
      </div>
    </div>
  )
}
