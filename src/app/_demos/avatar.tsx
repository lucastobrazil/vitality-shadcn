"use client"

import { Avatar, AvatarImage, AvatarFallback } from "@/registry/vitality/ui/avatar"

export default function AvatarDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic with image</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Fallback only</p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>WK</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
