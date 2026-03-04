import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardButtonComponent } from "./button.component";

const meta: Meta<ZardButtonComponent> = {
  title: "UI/Button",
  component: ZardButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardButtonComponent],
    }),
  ],
  argTypes: {
    zVariant: {
      control: "select",
      options: ["default", "primary", "destructive", "outline", "ghost", "link"],
    },
    zSize: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    zShape: {
      control: "select",
      options: ["default", "circle", "square"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardButtonComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<button z-button [zVariant]="zVariant" [zSize]="zSize" [zShape]="zShape">Button</button>`,
  }),
  args: {
    zVariant: "default",
    zSize: "default",
    zShape: "default",
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <button z-button zVariant="primary">Default</button>
        <button z-button zVariant="destructive">Destructive</button>
        <button z-button zVariant="outline">Outline</button>
        <button z-button zVariant="default">Secondary</button>
        <button z-button zVariant="ghost">Ghost</button>
        <button z-button zVariant="link">Link</button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <button z-button zSize="xs">Extra Small</button>
        <button z-button zSize="sm">Small</button>
        <button z-button zSize="default">Default</button>
        <button z-button zSize="lg">Large</button>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <button z-button [zLoading]="true">Loading</button>
        <button z-button zVariant="outline" [zLoading]="true">Loading</button>
        <button z-button zVariant="default" [zLoading]="true">Loading</button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <button z-button [zDisabled]="true">Disabled</button>
        <button z-button zVariant="outline" [zDisabled]="true">Disabled</button>
        <button z-button zVariant="default" [zDisabled]="true">Disabled</button>
        <button z-button zVariant="destructive" [zDisabled]="true">Disabled</button>
      </div>
    `,
  }),
};
