"use client"

import { toast } from "sonner"
import { Toaster } from "@/registry/vitality/ui/sonner"
import { Button } from "@/registry/vitality/ui/button"

export default function SonnerDemo() {
  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <p className="mb-2 text-sm font-medium">Toast types</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => toast("Event has been created")}
          >
            Default
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.success("Changes saved successfully")}
          >
            Success
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.error("Something went wrong")}
          >
            Error
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.info("New update available")}
          >
            Info
          </Button>
          <Button
            variant="outline"
            onClick={() => toast.warning("Your session is about to expire")}
          >
            Warning
          </Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With description and action</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() =>
              toast("Event has been created", {
                description: "Sunday, December 03, 2023 at 9:00 AM",
              })
            }
          >
            With description
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              toast("File deleted", {
                action: {
                  label: "Undo",
                  onClick: () => toast.success("File restored"),
                },
              })
            }
          >
            With action
          </Button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Promise toast</p>
        <Button
          variant="outline"
          onClick={() =>
            toast.promise(
              new Promise((resolve) => setTimeout(resolve, 2000)),
              {
                loading: "Loading...",
                success: "Data loaded successfully!",
                error: "Failed to load data",
              }
            )
          }
        >
          Promise
        </Button>
      </div>
    </div>
  )
}
