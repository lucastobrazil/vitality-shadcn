"use client";

import { SideNav } from "@/registry/vitality/blocks/side-nav";

export default function SideNavDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Expanded (default)</p>
        <div className="rounded-lg border overflow-hidden h-[420px]">
          <SideNav defaultExpanded={true} />
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Collapsed</p>
        <div className="rounded-lg border overflow-hidden h-[480px]">
          <SideNav defaultExpanded={false} />
        </div>
      </div>
    </div>
  );
}
