"use client";

import { chip as Chip } from "@/registry/vitality/ui/chip";
import { User } from "lucide-react";

export default function ChipWithIcon() {
  return (
    <Chip>
      <User /> Dr. Jean Carrol
      <span className="text-xs text-foreground/60">&middot; Email</span>
    </Chip>
  );
}
