"use client"

import { useState, useEffect } from "react"
import { CopyIcon, CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/registry/vitality/ui/button"

export function CopyButton({
  value,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string
}) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  return (
    <Button
      data-slot="copy-button"
      data-copied={hasCopied}
      size="icon"
      variant="ghost"
      className={cn(
        "absolute top-3 right-2 z-10 size-7 bg-[var(--code)] hover:opacity-100 focus-visible:opacity-100",
        className
      )}
      onClick={() => {
        navigator.clipboard.writeText(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
    </Button>
  )
}
