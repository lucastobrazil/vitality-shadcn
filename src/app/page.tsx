import Link from "next/link"
import { components } from "./registry"
import { StatusBadge } from "@/registry/vitality/ui/status-badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/registry/vitality/ui/card"

export default function Home() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Vitality Components</h1>
        <p className="mt-2 text-muted-foreground">
          A self-hosted shadcn/ui registry with custom Vitality theme. Browse components below or use{" "}
          <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-mono">⌘K</kbd>{" "}
          to search.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {components.map((c) => (
          <Link key={c.slug} href={`/components/${c.slug}`}>
            <Card className="h-full transition-colors hover:bg-muted/50">
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm font-medium">{c.name}</CardTitle>
                  {c.isCustom && (
                    <StatusBadge severity="brand" className="text-[10px] px-1.5 py-0">
                      Custom
                    </StatusBadge>
                  )}
                </div>
                <CardDescription className="text-xs line-clamp-2">
                  {c.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  )
}
