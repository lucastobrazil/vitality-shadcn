"use client"

import * as React from "react"
import type { DateRange } from "react-day-picker"

import { DateRangePicker } from "@/registry/vitality/ui/date-range-picker"

export default function DateRangePickerDemo() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: new Date(2025, 1, 9),
  })

  return <DateRangePicker value={date} onChange={setDate} />
}
