"use client"

import dynamic from "next/dynamic"

export function LivePreview({ slug }: { slug: string }) {
  const Demo = dynamic(() => import(`../_demos/${slug}`), {
    loading: () => (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        Loading preview…
      </div>
    ),
  })

  return <Demo />
}
