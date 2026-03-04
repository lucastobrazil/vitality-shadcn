"use client";

import { chip as Chip } from "@/registry/vitality/ui/chip";
import { StarIcon, CircleCheckIcon } from "lucide-react";

export default function ChipWithIcon() {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip>
        <StarIcon /> Featured
      </Chip>
      <Chip>
        <CircleCheckIcon /> Verified
      </Chip>
    </div>
  );
}
