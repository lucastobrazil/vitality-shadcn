import { cn } from "@/lib/utils"

export function Steps({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8",
        className
      )}
      {...props}
    />
  )
}

export function Step({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "step mt-8 scroll-mt-28 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}
