"use client"

import { useEffect, useState, useRef } from "react"
import type { TocItem } from "@/lib/mdx"

function useActiveItem(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (ids.length === 0) return

    observerRef.current?.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "0% 0% -80% 0%" }
    )

    observerRef.current = observer

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [ids])

  return activeId
}

export function DocsTableOfContents({ toc }: { toc: TocItem[] }) {
  const ids = toc.map((item) => item.url.slice(1))
  const activeId = useActiveItem(ids)

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">On This Page</p>
      <div className="flex flex-col gap-1">
        {toc.map((item) => {
          const id = item.url.slice(1)
          return (
            <a
              key={item.url}
              href={item.url}
              data-active={activeId === id || undefined}
              data-depth={item.depth}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground data-[active]:text-foreground data-[active]:font-medium data-[depth='3']:pl-4"
            >
              {item.title}
            </a>
          )
        })}
      </div>
    </div>
  )
}
