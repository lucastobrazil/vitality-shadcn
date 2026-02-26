"use client";

import { Badge } from "@/registry/vitality/ui/badge";
import { Spinner } from "@/registry/vitality/ui/spinner";
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  XCircleIcon,
  SparklesIcon,
  MailIcon,
  BellIcon,
  StarIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
} from "lucide-react";

export default function BadgeWithIconsDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">With icons</p>
        <div className="flex flex-wrap gap-2">
          <Badge>
            <MailIcon /> Inbox
          </Badge>
          <Badge variant="primary">
            <StarIcon /> Featured
          </Badge>
          <Badge variant="success">
            <CheckCircleIcon /> Verified
          </Badge>
          <Badge variant="warning">
            <AlertTriangleIcon /> Caution
          </Badge>
          <Badge variant="destructive">
            <XCircleIcon /> Error
          </Badge>
          <Badge variant="info">
            <InfoIcon /> Update
          </Badge>
          <Badge variant="brand">
            <SparklesIcon /> New
          </Badge>
          <Badge variant="neutral">
            <BellIcon /> Alert
          </Badge>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With spinner</p>
        <div className="flex flex-wrap gap-2">
          <Badge>
            <Spinner className="text-background" size="sm" /> Loading
          </Badge>
          <Badge variant="primary">
            <Spinner className="text-background" size="sm" /> Syncing
          </Badge>
          <Badge variant="warning">
            <Spinner className="text-warning-900" size="sm" /> Processing
          </Badge>
          <Badge variant="info">
            <Spinner className="text-warning-900" size="sm" /> Updating
          </Badge>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">As link</p>
        <div className="flex flex-wrap gap-2">
          <Badge asChild>
            <a href="#">Default <ExternalLinkIcon /></a>
          </Badge>
          <Badge asChild variant="primary">
            <a href="#">Primary <ArrowRightIcon /></a>
          </Badge>
          <Badge asChild variant="success">
            <a href="#"><CheckCircleIcon /> Published</a>
          </Badge>
          <Badge asChild variant="brand">
            <a href="#"><SparklesIcon /> What&apos;s new</a>
          </Badge>
        </div>
      </div>
    </div>
  );
}
