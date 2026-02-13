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
    <div className="max-w-md">
      <Progress value={progress} />
    </div>
  )
}
