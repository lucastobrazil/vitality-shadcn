"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { components, blocks } from "../registry";
import { ThemeToggle } from "./theme-toggle";
import { ScrollArea } from "@/registry/vitality/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/registry/vitality/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/registry/vitality/ui/sidebar";

type Filter = "all" | "custom" | "standard";

export function AppSidebar() {
  const pathname = usePathname();
  const [filter, setFilter] = useState<Filter>("all");
  const { isMobile, setOpenMobile } = useSidebar();

  const filtered = components.filter((c) => {
    if (filter === "custom") return c.isCustom;
    if (filter === "standard") return !c.isCustom;
    return true;
  });

  return (
    <Sidebar>
      <SidebarHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.svg`}
              alt="Vitality"
              width={138}
              height={47}
              className="w-auto dark:grayscale dark:invert"
              priority
            />
          </Link>
          <ThemeToggle />
        </div>
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
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-0.5 px-2 pb-4">
            <Link
              href="/"
              onClick={() => isMobile && setOpenMobile(false)}
              className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors mt-2 ${
                pathname === "/"
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              Getting Started
            </Link>
            <p className="px-2 pt-4 pb-1 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              Blocks
            </p>
            {blocks.map((b) => {
              const isActive = pathname === `/blocks/${b.slug}`;
              return (
                <Link
                  key={b.slug}
                  href={`/blocks/${b.slug}`}
                  onClick={() => isMobile && setOpenMobile(false)}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {b.name}
                </Link>
              );
            })}
            <p className="px-2 pt-4 pb-1 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              Components
            </p>
            {filtered.map((c) => {
              const isActive = pathname === `/components/${c.slug}`;
              return (
                <Link
                  key={c.slug}
                  href={`/components/${c.slug}`}
                  onClick={() => isMobile && setOpenMobile(false)}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {c.name}
                  {c.isCustom && (
                    <span className="size-1.5 rounded-full bg-secondary shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
