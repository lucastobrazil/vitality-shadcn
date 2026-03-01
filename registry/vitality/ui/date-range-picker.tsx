"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/vitality/ui/button"
import { Calendar } from "@/registry/vitality/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/vitality/ui/popover"

function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date range",
  numberOfMonths = 2,
  className,
  ...props
}: {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  numberOfMonths?: number
} & Omit<React.ComponentProps<typeof Button>, "value" | "onChange">) {
  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >()

  const range = value ?? internalRange
  const setRange = onChange ?? setInternalRange

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !range && "text-muted-foreground",
            className
          )}
          {...props}
        >
          <CalendarIcon className="size-4" />
          {range?.from ? (
            range.to ? (
              <>
                {format(range.from, "LLL dd, y")} –{" "}
                {format(range.to, "LLL dd, y")}
              </>
            ) : (
              format(range.from, "LLL dd, y")
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={range?.from}
          selected={range}
          onSelect={setRange}
          numberOfMonths={numberOfMonths}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DateRangePicker }
