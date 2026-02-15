import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardBadgeComponent } from "./badge.component";

const meta: Meta<ZardBadgeComponent> = {
  title: "UI/Badge",
  component: ZardBadgeComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardBadgeComponent],
    }),
  ],
  argTypes: {
    zVariant: {
      control: "select",
      options: ["default", "neutral"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardBadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-badge [zVariant]="zVariant">Badge</z-badge>`,
  }),
  args: {
    zVariant: "default",
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <z-badge zVariant="default">Default</z-badge>
        <z-badge zVariant="neutral">Neutral</z-badge>
      </div>
    `,
  }),
};
