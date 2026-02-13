"use client"

import { SidebarTrigger } from "@/registry/vitality/ui/sidebar"

export function MobileHeader() {
  return (
    <header className="flex items-center gap-2 border-b px-4 py-2 md:hidden">
      <SidebarTrigger />
      <span className="text-sm font-semibold tracking-tight">Vitality</span>
    </header>
  )
}
