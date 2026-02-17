"use client";

import { useState } from "react";
import {
  CopyIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { Button } from "@/registry/vitality/ui/button";

export function CodeBlock({ html, code }: { html: string; code: string }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border bg-muted/30">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">Code</span>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-xs" onClick={copy}>
            {copied ? (
              <CheckIcon className="size-3" />
            ) : (
              <CopyIcon className="size-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ChevronUpIcon className="size-3" />
            ) : (
              <ChevronDownIcon className="size-3" />
            )}
          </Button>
        </div>
      </div>
      <div className={`overflow-hidden ${expanded ? "" : "max-h-64"} relative`}>
        <div
          className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_code]:!bg-transparent"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {!expanded && (
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-muted/80 to-transparent" />
        )}
      </div>
    </div>
  );
}
