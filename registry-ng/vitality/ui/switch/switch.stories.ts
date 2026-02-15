import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardSwitchComponent } from "./switch.component";

const meta: Meta<ZardSwitchComponent> = {
  title: "UI/Switch",
  component: ZardSwitchComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardSwitchComponent],
    }),
  ],
  argTypes: {
    zSize: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    zType: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardSwitchComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-switch [zSize]="zSize" [zType]="zType">Airplane Mode</z-switch>`,
  }),
  args: {
    zSize: "default",
    zType: "default",
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <z-switch zSize="sm">Small</z-switch>
        <z-switch zSize="default">Default</z-switch>
        <z-switch zSize="lg">Large</z-switch>
      </div>
    `,
  }),
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <z-switch zType="default">Default type</z-switch>
        <z-switch zType="destructive">Destructive type</z-switch>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <z-switch [zDisabled]="true">Disabled (checked)</z-switch>
        <z-switch [zDisabled]="true" [zChecked]="false">Disabled (unchecked)</z-switch>
      </div>
    `,
  }),
};
