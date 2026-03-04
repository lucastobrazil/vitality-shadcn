"use client"

import { Tabs, TabsList, TabsTrigger } from "@/registry/vitality/ui/tabs"
import { AppWindowIcon, CodeIcon } from "lucide-react"

export default function TabsIcons() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">
          <AppWindowIcon />
          Preview
        </TabsTrigger>
        <TabsTrigger value="code">
          <CodeIcon />
          Code
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
