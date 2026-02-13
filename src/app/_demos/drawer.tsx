"use client"

import { useState } from "react"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/registry/vitality/ui/drawer"
import { Button } from "@/registry/vitality/ui/button"
import { Input } from "@/registry/vitality/ui/input"
import { Label } from "@/registry/vitality/ui/label"
import { MinusIcon, PlusIcon } from "lucide-react"

export default function DrawerDemo() {
  const [goal, setGoal] = useState(350)

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Move Goal</DrawerTitle>
                <DrawerDescription>Set your daily activity goal.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <div className="flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGoal(Math.max(100, goal - 10))}
                  >
                    <MinusIcon />
                  </Button>
                  <div className="text-center">
                    <div className="text-7xl font-bold tracking-tighter">{goal}</div>
                    <div className="text-muted-foreground text-sm">calories/day</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setGoal(Math.min(1000, goal + 10))}
                  >
                    <PlusIcon />
                  </Button>
                </div>
              </div>
              <DrawerFooter>
                <Button variant="primary">Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With form</p>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Add Address</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>New Address</DrawerTitle>
                <DrawerDescription>Add a shipping address to your account.</DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-4 p-4">
                <div className="grid gap-2">
                  <Label htmlFor="street">Street</Label>
                  <Input id="street" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="New York" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="10001" />
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <Button variant="primary">Save Address</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
