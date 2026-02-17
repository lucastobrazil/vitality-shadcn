"use client"

import dynamic from "next/dynamic"

const demos: Record<string, React.ComponentType> = {
  accordion: dynamic(() => import("../_demos/accordion")),
  alert: dynamic(() => import("../_demos/alert")),
  "alert-dialog": dynamic(() => import("../_demos/alert-dialog")),
  "aspect-ratio": dynamic(() => import("../_demos/aspect-ratio")),
  avatar: dynamic(() => import("../_demos/avatar")),
  badge: dynamic(() => import("../_demos/badge")),
  breadcrumb: dynamic(() => import("../_demos/breadcrumb")),
  button: dynamic(() => import("../_demos/button")),
  calendar: dynamic(() => import("../_demos/calendar")),
  card: dynamic(() => import("../_demos/card")),
  carousel: dynamic(() => import("../_demos/carousel")),
  chart: dynamic(() => import("../_demos/chart")),
  checkbox: dynamic(() => import("../_demos/checkbox")),
  collapsible: dynamic(() => import("../_demos/collapsible")),
  command: dynamic(() => import("../_demos/command")),
  "context-menu": dynamic(() => import("../_demos/context-menu")),
  dialog: dynamic(() => import("../_demos/dialog")),
  drawer: dynamic(() => import("../_demos/drawer")),
  "dropdown-menu": dynamic(() => import("../_demos/dropdown-menu")),
  form: dynamic(() => import("../_demos/form")),
  "hover-card": dynamic(() => import("../_demos/hover-card")),
  input: dynamic(() => import("../_demos/input")),
  "input-group": dynamic(() => import("../_demos/input-group")),
  "input-otp": dynamic(() => import("../_demos/input-otp")),
  label: dynamic(() => import("../_demos/label")),
  menubar: dynamic(() => import("../_demos/menubar")),
  "navigation-menu": dynamic(() => import("../_demos/navigation-menu")),
  pagination: dynamic(() => import("../_demos/pagination")),
  popover: dynamic(() => import("../_demos/popover")),
  progress: dynamic(() => import("../_demos/progress")),
  "radio-group": dynamic(() => import("../_demos/radio-group")),
  resizable: dynamic(() => import("../_demos/resizable")),
  "scroll-area": dynamic(() => import("../_demos/scroll-area")),
  select: dynamic(() => import("../_demos/select")),
  separator: dynamic(() => import("../_demos/separator")),
  sheet: dynamic(() => import("../_demos/sheet")),
  skeleton: dynamic(() => import("../_demos/skeleton")),
  slider: dynamic(() => import("../_demos/slider")),
  sonner: dynamic(() => import("../_demos/sonner")),
  spinner: dynamic(() => import("../_demos/spinner")),
  "status-badge": dynamic(() => import("../_demos/status-badge")),
  switch: dynamic(() => import("../_demos/switch")),
  table: dynamic(() => import("../_demos/table")),
  tabs: dynamic(() => import("../_demos/tabs")),
  textarea: dynamic(() => import("../_demos/textarea")),
  toggle: dynamic(() => import("../_demos/toggle")),
  "toggle-group": dynamic(() => import("../_demos/toggle-group")),
  tooltip: dynamic(() => import("../_demos/tooltip")),
  header: dynamic(() => import("../_demos/header")),
  "side-nav": dynamic(() => import("../_demos/side-nav")),
}

export function LivePreview({ slug }: { slug: string }) {
  const Demo = demos[slug]
  if (!Demo) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
        No preview available.
      </div>
    )
  }
  return <Demo />
}
