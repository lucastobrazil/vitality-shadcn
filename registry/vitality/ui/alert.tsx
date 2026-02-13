import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      severity: {
        muted: "text-foreground bg-muted [&>svg]:text-foreground",
        destructive:
          "text-destructive bg-destructive/10 [&>svg]:text-destructive",
        warning: "text-warning bg-warning/10 [&>svg]:text-warning",
        success: "text-success bg-success/10 [&>svg]:text-success",
        info: "text-info bg-info/10 [&>svg]:text-info",
        brand: "text-brand bg-brand/10 [&>svg]:text-brand",
      },
      size: {
        default: "px-4 py-3 text-sm",
        compact:
          "px-0 py-0 bg-transparent! border-transparent! text-xs flex items-center gap-1 [&>svg]:translate-y-0 [&>svg]:shrink-0",
        blockCompact:
          "px-3 py-2 text-sm flex! gap-x-1!",
      },
    },
    defaultVariants: {
      severity: "muted",
      size: "default",
    },
  }
)

function Alert({
  className,
  severity,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      data-severity={severity}
      data-size={size}
      role="alert"
      className={cn(alertVariants({ severity, size }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 min-h-4 font-semibold",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        "[[data-size=blockCompact]_&]:col-auto [[data-size=blockCompact]_&]:inline",
        className
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants }
