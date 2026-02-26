"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/vitality/ui/button";

export function ComponentPreviewTabs({
  component,
  source,
  sourcePreview,
  align = "center",
  hideCode = false,
  previewClassName,
  className,
}: {
  component: React.ReactNode;
  source: React.ReactNode;
  sourcePreview: React.ReactNode;
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  previewClassName?: string;
  className?: string;
}) {
  const [isMobileCodeVisible, setIsMobileCodeVisible] = React.useState(false);

  return (
    <div className={cn("mt-4 mb-12 rounded-xl border", className)}>
      <div
        className={cn(
          "flex h-72 items-center justify-center p-6",
          align === "start" && "items-start",
          align === "end" && "items-end",
          previewClassName,
        )}
      >
        {component}
      </div>
      {!hideCode && (
        <div
          className="relative"
          data-mobile-code-visible={isMobileCodeVisible}
        >
          {isMobileCodeVisible ? (
            <div className="[&_[data-rehype-pretty-code-figure]]:!m-0 [&_pre]:max-h-72 **:data-[slot=copy-button]:flex rounded-t-none border-t">
              {source}
            </div>
          ) : (
            <div className="[&_[data-rehype-pretty-code-figure]]:!m-0 **:data-[slot=copy-button]:hidden rounded-t-none border-t relative overflow-hidden">
              {sourcePreview}
              <div className="from-[var(--code)]/70 to-[var(--code)] absolute inset-x-0 bottom-0 flex h-full items-center justify-center bg-gradient-to-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground h-7 rounded-md px-2"
                  onClick={() => setIsMobileCodeVisible(true)}
                >
                  View Code
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
