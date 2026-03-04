"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/registry/vitality/ui/avatar"

export default function AvatarBasic() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
