import { cn } from "@/lib/utils"
import {
  Callout,
  CalloutDescription,
} from "@/registry/vitality/ui/callout"

export function MdxCallout({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Callout severity="info" className={cn("my-6", className)}>
      <CalloutDescription>{children}</CalloutDescription>
    </Callout>
  )
}
