import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardSegmentedComponent, ZardSegmentedItemComponent } from "./segmented.component";

const meta: Meta<ZardSegmentedComponent> = {
  title: "UI/Segmented",
  component: ZardSegmentedComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardSegmentedComponent, ZardSegmentedItemComponent],
    }),
  ],
  argTypes: {
    zSize: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardSegmentedComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      options: [
        { value: "daily", label: "Daily" },
        { value: "weekly", label: "Weekly" },
        { value: "monthly", label: "Monthly" },
      ],
    },
    template: `<z-segmented [zOptions]="options" [zSize]="zSize" zDefaultValue="daily" />`,
  }),
  args: {
    zSize: "default",
  },
};

export const Sizes: Story = {
  render: () => ({
    props: {
      options: [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
      ],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <z-segmented [zOptions]="options" zSize="sm" zDefaultValue="a" />
        <z-segmented [zOptions]="options" zSize="default" zDefaultValue="a" />
        <z-segmented [zOptions]="options" zSize="lg" zDefaultValue="a" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: {
      options: [
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
        { value: "three", label: "Three" },
      ],
    },
    template: `<z-segmented [zOptions]="options" [zDisabled]="true" zDefaultValue="one" />`,
  }),
};
