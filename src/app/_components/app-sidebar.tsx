"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FilterIcon } from "lucide-react"
import type { DemoMeta } from "@/lib/registry"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/registry/vitality/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/registry/vitality/ui/dropdown-menu"
import { Button } from "@/registry/vitality/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/registry/vitality/ui/sidebar"

type Filter = "all" | "shadcn" | "shadcn-customised" | "vitality"

function SidebarNav({
  components,
  blocks,
  onNavigate,
}: {
  components: DemoMeta[]
  blocks: DemoMeta[]
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const [filter, setFilter] = useState<Filter>("all")

  const customisedCount = components.filter(
    (c) => c.source === "shadcn-customised"
  ).length
  const vitalityCount = components.filter((c) => c.source === "vitality").length
  const shadcnCount = components.length - customisedCount - vitalityCount

  const filtered = components.filter((c) => {
    if (filter === "all") return true
    return c.source === filter
  })

  return (
    <>
      <SidebarContent className="pt-4 no-scrollbar overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Guides
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/"}
                  className="text-[0.8rem] font-medium"
                >
                  <Link href="/" onClick={onNavigate}>
                    Getting Started
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Blocks
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {blocks.map((b) => (
                <SidebarMenuItem key={b.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/blocks/${b.slug}`}
                    className="text-[0.8rem] font-medium"
                  >
                    <Link href={`/blocks/${b.slug}`} onClick={onNavigate}>
                      {b.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            Components
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className={
                    filter !== "all" ? "text-primary" : "text-muted-foreground"
                  }
                >
                  <FilterIcon className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuRadioGroup
                  value={filter}
                  onValueChange={(v) => setFilter(v as Filter)}
                >
                  <DropdownMenuRadioItem value="all">
                    All ({components.length})
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="shadcn">
                    Standard ({shadcnCount})
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="shadcn-customised">
                    Customised ({customisedCount})
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="vitality">
                    Custom Vitality ({vitalityCount})
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {filtered.map((c) => (
                <SidebarMenuItem key={c.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/components/${c.slug}`}
                    className="text-[0.8rem] font-medium"
                  >
                    <Link href={`/components/${c.slug}`} onClick={onNavigate}>
                      {c.name}
                      {c.source === "vitality" && (
                        <span className="size-1.5 rounded-full bg-primary shrink-0" />
                      )}
                      {c.source === "shadcn-customised" && (
                        <span className="size-1.5 rounded-full bg-secondary shrink-0" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="from-background via-background/80 to-background/0 pointer-events-none sticky -bottom-1 z-10 h-16 shrink-0 bg-gradient-to-t" />
      </SidebarContent>
    </>
  )
}

export function AppSidebar({
  components,
  blocks,
}: {
  components: DemoMeta[]
  blocks: DemoMeta[]
}) {
  const { openMobile, setOpenMobile } = useSidebar()

  return (
    <>
      {/* Desktop — inline sticky sidebar, below header */}
      <Sidebar
        collapsible="none"
        className="sticky top-14 hidden h-[calc(100svh-3.5rem)] bg-transparent lg:flex"
      >
        <SidebarNav components={components} blocks={blocks} />
      </Sidebar>

      {/* Mobile — sheet sidebar */}
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          className="bg-sidebar text-sidebar-foreground w-72 p-0 [&>button]:hidden"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
            <SheetDescription>Site navigation</SheetDescription>
          </SheetHeader>
          <div className="flex h-full flex-col">
            <SidebarNav
              components={components}
              blocks={blocks}
              onNavigate={() => setOpenMobile(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
