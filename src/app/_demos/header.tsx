"use client";

import { Header } from "@/registry/vitality/blocks/header";

export default function HeaderDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <div className="rounded-lg border overflow-hidden">
          <Header />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Custom search placeholder</p>
        <div className="rounded-lg border overflow-hidden">
          <Header searchPlaceholder="Search patients..." />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With custom user</p>
        <div className="rounded-lg border overflow-hidden">
          <Header
            user={{
              name: "Jane Smith",
              email: "jane@example.com",
              avatarFallback: "JS",
            }}
          />
        </div>
      </div>
    </div>
  );
}
