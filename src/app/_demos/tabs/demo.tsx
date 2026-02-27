"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/vitality/ui/tabs";
import { UserIcon, SettingsIcon, BellIcon } from "lucide-react";

export default function TabsDemo() {
  return (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <Tabs defaultValue="account" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <p className="text-sm text-muted-foreground">
              Make changes to your account here. Click save when you&apos;re
              done.
            </p>
          </TabsContent>
          <TabsContent value="password">
            <p className="text-sm text-muted-foreground">
              Change your password here. After saving, you&apos;ll be logged
              out.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Line variant</p>
        <Tabs defaultValue="overview" className="w-full max-w-md">
          <TabsList variant="line">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-muted-foreground">
              A high-level summary of your project.
            </p>
          </TabsContent>
          <TabsContent value="analytics">
            <p className="text-sm text-muted-foreground">
              Detailed analytics and metrics.
            </p>
          </TabsContent>
          <TabsContent value="reports">
            <p className="text-sm text-muted-foreground">
              Generated reports and exports.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Vertical</p>
        <Tabs
          defaultValue="general"
          orientation="vertical"
          className="w-full max-w-md"
        >
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <p className="text-sm text-muted-foreground">
              General account settings.
            </p>
          </TabsContent>
          <TabsContent value="security">
            <p className="text-sm text-muted-foreground">
              Security and authentication options.
            </p>
          </TabsContent>
          <TabsContent value="billing">
            <p className="text-sm text-muted-foreground">
              Manage your billing and subscriptions.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">With icons</p>
        <Tabs defaultValue="profile" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="profile">
              <UserIcon /> Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon /> Settings
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <BellIcon /> Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <p className="text-sm text-muted-foreground">
              Manage your profile information.
            </p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-sm text-muted-foreground">
              Configure application settings.
            </p>
          </TabsContent>
          <TabsContent value="notifications">
            <p className="text-sm text-muted-foreground">
              Set your notification preferences.
            </p>
          </TabsContent>
        </Tabs>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Disabled tabs</p>
        <Tabs defaultValue="active" className="w-full max-w-md">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="disabled" disabled>
              Disabled
            </TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <p className="text-sm text-muted-foreground">
              This tab is active and selectable.
            </p>
          </TabsContent>
          <TabsContent value="other">
            <p className="text-sm text-muted-foreground">
              This tab is also selectable.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
