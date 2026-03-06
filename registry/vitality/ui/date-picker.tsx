"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/vitality/ui/button"
import { Calendar } from "@/registry/vitality/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/vitality/ui/popover"

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  className,
  ...props
}: {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
} & Omit<React.ComponentProps<typeof Button>, "value" | "onChange">) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>()

  const date = value ?? internalDate
  const setDate = onChange ?? setInternalDate

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          {...props}
        >
          <CalendarIcon className="size-4" />
          {date ? format(date, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
