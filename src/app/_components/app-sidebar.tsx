"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { components } from "../registry"
import { ThemeToggle } from "./theme-toggle"
import { ScrollArea } from "@/registry/vitality/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/vitality/ui/select"

type Filter = "all" | "custom" | "standard"

export function AppSidebar() {
  const pathname = usePathname()
  const [filter, setFilter] = useState<Filter>("all")

  const filtered = components.filter((c) => {
    if (filter === "custom") return c.isCustom
    if (filter === "standard") return !c.isCustom
    return true
  })

  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col border-r bg-background">
      <div className="flex items-center justify-between p-4 pb-2">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Vitality
        </Link>
        <ThemeToggle />
      </div>
      <div className="px-4 pb-3">
        <Select value={filter} onValueChange={(v: Filter) => setFilter(v)}>
          <SelectTrigger className="h-7 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Components</SelectItem>
            <SelectItem value="custom">Custom Only</SelectItem>
            <SelectItem value="standard">Standard Only</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-0.5 px-2 pb-4">
          {filtered.map((c) => {
            const isActive = pathname === `/components/${c.slug}`
            return (
              <Link
                key={c.slug}
                href={`/components/${c.slug}`}
                className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {c.isCustom && (
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                )}
                <span className={c.isCustom ? "" : "pl-3.5"}>{c.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>
    </aside>
  )
}
