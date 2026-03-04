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
    zVariant: {
      control: "select",
      options: ["default", "outline"],
    },
    zSize: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardToggleComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-toggle [zVariant]="zVariant" [zSize]="zSize">Bold</z-toggle>`,
  }),
  args: {
    zVariant: "default",
    zSize: "default",
  },
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <z-toggle zVariant="default">Default</z-toggle>
        <z-toggle zVariant="outline">Outline</z-toggle>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <z-toggle [disabled]="true">Disabled</z-toggle>
        <z-toggle zVariant="outline" [disabled]="true">Disabled Outline</z-toggle>
      </div>
    `,
  }),
};
