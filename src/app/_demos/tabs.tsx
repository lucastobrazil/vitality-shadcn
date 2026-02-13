"use client"

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/vitality/ui/tabs"
import { UserIcon, SettingsIcon, BellIcon } from "lucide-react"

export default function TabsDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you&apos;re done.
            </p>
          </TabsContent>
          <TabsContent value="password">
            <p className="text-sm text-muted-foreground">
              Change your password here. After saving, you&apos;ll be logged out.
            </p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With icons</p>
        <Tabs defaultValue="profile" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="profile">
              <UserIcon className="mr-1.5 size-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="mr-1.5 size-4" /> Settings
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <BellIcon className="mr-1.5 size-4" /> Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <p className="text-sm text-muted-foreground">Manage your profile information.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-sm text-muted-foreground">Configure application settings.</p>
          </TabsContent>
          <TabsContent value="notifications">
            <p className="text-sm text-muted-foreground">Set your notification preferences.</p>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled tab</p>
        <Tabs defaultValue="active" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disabled" disabled>Disabled</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <p className="text-sm text-muted-foreground">This tab is active and selectable.</p>
          </TabsContent>
          <TabsContent value="other">
            <p className="text-sm text-muted-foreground">This tab is also selectable.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
