"use client"

import { useState } from "react"
import { Calendar } from "@/registry/vitality/ui/calendar"
import type { DateRange } from "react-day-picker"

export default function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
  })

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Single date</p>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Date range</p>
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          className="rounded-md border"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled dates (weekends)</p>
        <Calendar
          mode="single"
          disabled={(date) => date.getDay() === 0 || date.getDay() === 6}
          className="rounded-md border"
        />
      </div>
    </div>
  )
}
