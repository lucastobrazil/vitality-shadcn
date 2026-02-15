import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardCheckboxComponent } from "./checkbox.component";

const meta: Meta<ZardCheckboxComponent> = {
  title: "UI/Checkbox",
  component: ZardCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardCheckboxComponent],
    }),
  ],
  argTypes: {
    zType: {
      control: "select",
      options: ["default", "destructive"],
    },
    zSize: {
      control: "select",
      options: ["default", "lg"],
    },
    zShape: {
      control: "select",
      options: ["default", "circle", "square"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardCheckboxComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-checkbox [zType]="zType" [zSize]="zSize" [zShape]="zShape">Accept terms and conditions</z-checkbox>`,
  }),
  args: {
    zType: "default",
    zSize: "default",
    zShape: "default",
  },
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <z-checkbox zType="default">Default checkbox</z-checkbox>
        <z-checkbox zType="destructive">Destructive checkbox</z-checkbox>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <z-checkbox zSize="default">Default size</z-checkbox>
        <z-checkbox zSize="lg">Large size</z-checkbox>
      </div>
    `,
  }),
};

export const Shapes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <z-checkbox zShape="default">Rounded (default)</z-checkbox>
        <z-checkbox zShape="circle">Circle</z-checkbox>
        <z-checkbox zShape="square">Square</z-checkbox>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <z-checkbox [zDisabled]="true">Disabled unchecked</z-checkbox>
        <z-checkbox [zDisabled]="true" zType="destructive">Disabled destructive</z-checkbox>
      </div>
    `,
  }),
};
