"use client";

import { chip as Chip } from "@/registry/vitality/ui/chip";
import { ArrowUpRightIcon } from "lucide-react";

export default function ChipAsLink() {
  return (
    <Chip asChild>
      <a href="#link">
        Paracetamol <ArrowUpRightIcon />
      </a>
    </Chip>
  );
}
