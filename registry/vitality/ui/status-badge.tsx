import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 px-2 py-0.5 text-xs font-medium border border-transparent rounded-md [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
  {
    variants: {
      color: {
        default:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        neutral:
          "bg-foreground/70 text-muted [a&]:hover:bg-foreground/90",
      },
      severity: {
        muted: "text-foreground bg-muted [&>svg]:text-foreground",
        destructive:
          "text-destructive bg-destructive/10 [&>svg]:text-destructive",
        warning: "text-warning bg-warning/10 [&>svg]:text-warning",
        success: "text-success bg-success/10 [&>svg]:text-success",
        info: "text-info bg-info/10 [&>svg]:text-info",
        brand: "text-brand bg-brand/10 [&>svg]:text-brand",
      },
    },
    defaultVariants: {
      color: "default",
      severity: "muted",
    },
  }
)

function StatusBadge({
  className,
  color,
  severity,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof statusBadgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="status-badge"
      className={cn(statusBadgeVariants({ color, severity }), className)}
      {...props}
    />
  )
}

export { StatusBadge, statusBadgeVariants }
