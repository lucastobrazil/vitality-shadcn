"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { components, blocks } from "../registry"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/registry/vitality/ui/command"

export function CommandBar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "C" && e.shiftKey && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [resolvedTheme, setTheme])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search components..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Components">
          {components.map((c) => (
            <CommandItem
              key={c.slug}
              onSelect={() => {
                router.push(`/components/${c.slug}`)
                setOpen(false)
              }}
            >
              {c.isCustom && (
                <span className="size-1.5 rounded-full bg-primary shrink-0" />
              )}
              {c.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Blocks">
          {blocks.map((b) => (
            <CommandItem
              key={b.slug}
              onSelect={() => {
                router.push(`/blocks/${b.slug}`)
                setOpen(false)
              }}
            >
              {b.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
