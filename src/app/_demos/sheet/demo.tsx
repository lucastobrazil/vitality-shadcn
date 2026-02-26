"use client"

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/registry/vitality/ui/sheet"
import { Button } from "@/registry/vitality/ui/button"
import { Input } from "@/registry/vitality/ui/input"
import { Label } from "@/registry/vitality/ui/label"

export default function SheetDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic (right)</p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>Make changes to your profile here.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 p-4">
              <div className="grid gap-2">
                <Label htmlFor="sheet-name">Name</Label>
                <Input id="sheet-name" defaultValue="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sheet-email">Email</Label>
                <Input id="sheet-email" type="email" defaultValue="john@example.com" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
              </SheetClose>
              <Button variant="primary">Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Different sides</p>
        <div className="flex flex-wrap gap-2">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" className="capitalize">{side}</Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle>{side} sheet</SheetTitle>
                  <SheetDescription>This sheet opens from the {side}.</SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Sheet content goes here.</p>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </div>
      </div>
    </div>
  )
}
