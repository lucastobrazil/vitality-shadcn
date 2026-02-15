import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardToggleComponent } from "./toggle.component";

const meta: Meta<ZardToggleComponent> = {
  title: "UI/Toggle",
  component: ZardToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardToggleComponent],
    }),
  ],
  argTypes: {
    zType: {
      control: "select",
      options: ["default", "outline"],
    },
    zSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardToggleComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-toggle [zType]="zType" [zSize]="zSize">Bold</z-toggle>`,
  }),
  args: {
    zType: "default",
    zSize: "md",
  },
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <z-toggle zType="default">Default</z-toggle>
        <z-toggle zType="outline">Outline</z-toggle>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <z-toggle [disabled]="true">Disabled</z-toggle>
        <z-toggle zType="outline" [disabled]="true">Disabled Outline</z-toggle>
      </div>
    `,
  }),
};
