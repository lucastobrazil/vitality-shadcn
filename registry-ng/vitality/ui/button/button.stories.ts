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
    zType: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
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
    template: `<button z-button [zType]="zType" [zSize]="zSize" [zShape]="zShape">Button</button>`,
  }),
  args: {
    zType: "default",
    zSize: "default",
    zShape: "default",
  },
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <button z-button zType="default">Default</button>
        <button z-button zType="destructive">Destructive</button>
        <button z-button zType="outline">Outline</button>
        <button z-button zType="secondary">Secondary</button>
        <button z-button zType="ghost">Ghost</button>
        <button z-button zType="link">Link</button>
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
        <button z-button zType="outline" [zLoading]="true">Loading</button>
        <button z-button zType="secondary" [zLoading]="true">Loading</button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <button z-button [zDisabled]="true">Disabled</button>
        <button z-button zType="outline" [zDisabled]="true">Disabled</button>
        <button z-button zType="secondary" [zDisabled]="true">Disabled</button>
        <button z-button zType="destructive" [zDisabled]="true">Disabled</button>
      </div>
    `,
  }),
};
