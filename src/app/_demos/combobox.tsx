"use client"

import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from "@/registry/vitality/ui/combobox"

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "gatsby", label: "Gatsby" },
  { value: "nuxt", label: "Nuxt" },
  { value: "sveltekit", label: "SvelteKit" },
]

export default function ComboboxDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <Combobox>
          <ComboboxInput placeholder="Search frameworks..." />
          <ComboboxContent>
            <ComboboxList>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
              {frameworks.map((framework) => (
                <ComboboxItem key={framework.value} value={framework.value}>
                  {framework.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <Combobox disabled>
          <ComboboxInput placeholder="Disabled..." disabled />
          <ComboboxContent>
            <ComboboxList>
              {frameworks.map((framework) => (
                <ComboboxItem key={framework.value} value={framework.value}>
                  {framework.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    </div>
  )
}
