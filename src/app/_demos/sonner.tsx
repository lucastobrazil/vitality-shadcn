"use client"

import { toast } from "sonner"
import { Toaster } from "@/registry/vitality/ui/sonner"
import { Button } from "@/registry/vitality/ui/button"

export default function SonnerDemo() {
  return (
    <div>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  )
}
