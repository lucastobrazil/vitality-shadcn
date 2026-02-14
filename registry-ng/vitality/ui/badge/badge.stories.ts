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
    zType: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
    zShape: {
      control: "select",
      options: ["default", "square", "pill"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardBadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-badge [zType]="zType" [zShape]="zShape">Badge</z-badge>`,
  }),
  args: {
    zType: "default",
    zShape: "default",
  },
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <z-badge zType="default">Default</z-badge>
        <z-badge zType="secondary">Secondary</z-badge>
        <z-badge zType="destructive">Destructive</z-badge>
        <z-badge zType="outline">Outline</z-badge>
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <z-badge zShape="default">Default</z-badge>
        <z-badge zShape="square">Square</z-badge>
        <z-badge zShape="pill">Pill</z-badge>
      </div>
    `,
  }),
};

export const AllCombinations: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: auto repeat(3, 1fr); gap: 8px; align-items: center;">
        <span></span>
        <span style="font-weight: 600; font-size: 12px;">Default</span>
        <span style="font-weight: 600; font-size: 12px;">Square</span>
        <span style="font-weight: 600; font-size: 12px;">Pill</span>

        <span style="font-weight: 600; font-size: 12px;">Default</span>
        <z-badge zType="default" zShape="default">Badge</z-badge>
        <z-badge zType="default" zShape="square">Badge</z-badge>
        <z-badge zType="default" zShape="pill">Badge</z-badge>

        <span style="font-weight: 600; font-size: 12px;">Secondary</span>
        <z-badge zType="secondary" zShape="default">Badge</z-badge>
        <z-badge zType="secondary" zShape="square">Badge</z-badge>
        <z-badge zType="secondary" zShape="pill">Badge</z-badge>

        <span style="font-weight: 600; font-size: 12px;">Destructive</span>
        <z-badge zType="destructive" zShape="default">Badge</z-badge>
        <z-badge zType="destructive" zShape="square">Badge</z-badge>
        <z-badge zType="destructive" zShape="pill">Badge</z-badge>

        <span style="font-weight: 600; font-size: 12px;">Outline</span>
        <z-badge zType="outline" zShape="default">Badge</z-badge>
        <z-badge zType="outline" zShape="square">Badge</z-badge>
        <z-badge zType="outline" zShape="pill">Badge</z-badge>
      </div>
    `,
  }),
};
