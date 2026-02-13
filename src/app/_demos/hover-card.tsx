"use client"

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/registry/vitality/ui/hover-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/vitality/ui/avatar"
import { CalendarDaysIcon } from "lucide-react"

export default function HoverCardDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <a href="#" className="text-sm font-medium underline underline-offset-4">
              @nextjs
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@nextjs</h4>
                <p className="text-sm text-muted-foreground">
                  The React Framework &ndash; created and maintained by @vercel.
                </p>
                <div className="flex items-center pt-2">
                  <CalendarDaysIcon className="mr-2 size-4 opacity-70" />
                  <span className="text-xs text-muted-foreground">Joined December 2021</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With detailed profile</p>
        <HoverCard>
          <HoverCardTrigger asChild>
            <a href="#" className="text-sm font-medium underline underline-offset-4">
              @shadcn
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@shadcn</h4>
                <p className="text-sm text-muted-foreground">
                  Creator of shadcn/ui. Building beautiful, accessible components.
                </p>
                <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
                  <span><strong className="text-foreground">1.2k</strong> following</span>
                  <span><strong className="text-foreground">48k</strong> followers</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}
