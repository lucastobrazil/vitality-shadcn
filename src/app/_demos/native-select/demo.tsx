"use client"

import {
  NativeSelect,
  NativeSelectOption,
  NativeSelectOptGroup,
} from "@/registry/vitality/ui/native-select"

export default function NativeSelectDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Default</p>
        <NativeSelect>
          <NativeSelectOption value="">Select a fruit</NativeSelectOption>
          <NativeSelectOption value="apple">Apple</NativeSelectOption>
          <NativeSelectOption value="banana">Banana</NativeSelectOption>
          <NativeSelectOption value="cherry">Cherry</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Small size</p>
        <NativeSelect size="sm">
          <NativeSelectOption value="">Select a color</NativeSelectOption>
          <NativeSelectOption value="red">Red</NativeSelectOption>
          <NativeSelectOption value="blue">Blue</NativeSelectOption>
          <NativeSelectOption value="green">Green</NativeSelectOption>
        </NativeSelect>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With option groups</p>
        <NativeSelect>
          <NativeSelectOption value="">Select a food</NativeSelectOption>
          <NativeSelectOptGroup label="Fruits">
            <NativeSelectOption value="apple">Apple</NativeSelectOption>
            <NativeSelectOption value="banana">Banana</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Vegetables">
            <NativeSelectOption value="carrot">Carrot</NativeSelectOption>
            <NativeSelectOption value="broccoli">Broccoli</NativeSelectOption>
          </NativeSelectOptGroup>
        </NativeSelect>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled</p>
        <NativeSelect disabled>
          <NativeSelectOption value="">Disabled</NativeSelectOption>
        </NativeSelect>
      </div>
    </div>
  )
}
