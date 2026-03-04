import { ComponentPreviewTabs } from "./component-preview-tabs"
import { ComponentSource } from "./component-source"
import { InstallCommand } from "./install-command"
import { LivePreview } from "./live-preview"
import type { DemoMeta } from "@/lib/registry"

export async function DemoPreview({ meta }: { meta: DemoMeta }) {
  if (!meta.hasDemo) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          No live preview available for this component.
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Install</h3>
          <InstallCommand name={meta.registryName} />
        </div>
      </div>
    )
  }

  const relativeSrc = `src/app/_demos/${meta.slug}.tsx`

  return (
    <div className="space-y-6">
      <ComponentPreviewTabs
        component={<LivePreview slug={meta.slug} />}
        source={<ComponentSource src={relativeSrc} collapsible={false} />}
        sourcePreview={
          <ComponentSource src={relativeSrc} collapsible={false} maxLines={3} />
        }
      />
      <div>
        <h3 className="mb-2 text-sm font-medium">Install</h3>
        <InstallCommand name={meta.registryName} />
      </div>
    </div>
  )
}
