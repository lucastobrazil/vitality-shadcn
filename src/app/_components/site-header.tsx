"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger } from "@/registry/vitality/ui/sidebar";
import { Separator } from "@/registry/vitality/ui/separator";
import { Kbd } from "@/registry/vitality/ui/kbd";

function openCommandBar() {
  document.dispatchEvent(
    new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }),
  );
}

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-14 max-w-[calc(var(--breakpoint-2xl)+2rem)] items-center gap-4 px-4">
        <SidebarTrigger className="lg:hidden" />
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logo.svg`}
            alt="Vitality"
            width={110}
            height={38}
            className="w-auto dark:grayscale dark:invert"
            priority
          />
        </Link>
        <a
          href={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/storybook`}
          className="text-muted-foreground hover:text-foreground hidden text-sm font-medium transition-colors lg:block"
        >
          Angular Storybook
        </a>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandBar}
            className="border-input bg-muted/40 text-muted-foreground hover:bg-muted flex h-8 w-56 items-center gap-2 rounded-md border px-3 text-sm transition-colors"
          >
            <SearchIcon className="size-3.5 shrink-0" />
            <span className="flex-1 text-left">Search...</span>
            <Kbd className="text-[10px]">⌘K</Kbd>
          </button>
          <Separator orientation="vertical" className="!h-4" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
