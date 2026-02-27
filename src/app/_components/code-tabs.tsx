"use client"

import * as React from "react"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/vitality/ui/tabs"

export function CodeTabs({ children }: { children: React.ReactNode }) {
  const [value, setValue] = React.useState("cli")

  return (
    <Tabs
      value={value}
      onValueChange={setValue}
      className="relative mt-6 w-full"
    >
      {children}
    </Tabs>
  )
}

export function CodeTabsList({ children }: { children: React.ReactNode }) {
  return (
    <TabsList variant="line" className="gap-4">
      {children}
    </TabsList>
  )
}

export function CodeTabsTrigger({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return <TabsTrigger value={value}>{children}</TabsTrigger>
}

export function CodeTabsContent({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <TabsContent value={value} className="relative">
      {children}
    </TabsContent>
  )
}
