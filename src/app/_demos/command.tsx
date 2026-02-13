"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/registry/vitality/ui/command"
import { CalendarIcon, SmileIcon, CalculatorIcon, SettingsIcon } from "lucide-react"

export default function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem><CalendarIcon className="mr-2" /> Calendar</CommandItem>
          <CommandItem><SmileIcon className="mr-2" /> Search Emoji</CommandItem>
          <CommandItem><CalculatorIcon className="mr-2" /> Calculator</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem><SettingsIcon className="mr-2" /> Settings</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
