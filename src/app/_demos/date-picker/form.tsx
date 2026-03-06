"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/vitality/ui/button"
import { Calendar } from "@/registry/vitality/ui/calendar"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/vitality/ui/field"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/vitality/ui/popover"

export default function DatePickerFormDemo() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [error, setError] = React.useState<string>()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!date) {
      setError("Please select a date of birth.")
      return
    }
    setError(undefined)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field data-invalid={!!error || undefined}>
        <FieldLabel>Date of birth</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="size-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d)
                setError(undefined)
              }}
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
        <FieldDescription>
          Your date of birth is used to calculate your age.
        </FieldDescription>
        {error && <FieldError>{error}</FieldError>}
      </Field>
      <Button type="submit" variant="primary" className="w-fit">
        Submit
      </Button>
    </form>
  )
}
