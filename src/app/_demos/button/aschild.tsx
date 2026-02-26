"use client"

import Link from "next/link"
import { Button } from "@/registry/vitality/ui/button"

export default function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
