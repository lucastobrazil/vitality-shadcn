import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardInputDirective } from "./input.directive";

const meta: Meta<ZardInputDirective> = {
  title: "UI/Input",
  component: ZardInputDirective,
  decorators: [
    moduleMetadata({
      imports: [ZardInputDirective],
    }),
  ],
  argTypes: {
    zSize: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    zStatus: {
      control: "select",
      options: [undefined, "error", "warning", "success"],
    },
    zBorderless: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<ZardInputDirective>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<input z-input placeholder="Enter text..." [zSize]="zSize" [zStatus]="zStatus" [zBorderless]="zBorderless" />`,
  }),
  args: {
    zSize: "default",
    zStatus: undefined,
    zBorderless: false,
  },
};

export const Textarea: Story = {
  render: (args) => ({
    props: args,
    template: `<textarea z-input placeholder="Enter a longer message..." [zSize]="zSize" [zStatus]="zStatus"></textarea>`,
  }),
  args: {
    zSize: "default",
    zStatus: undefined,
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 320px;">
        <input z-input zSize="sm" placeholder="Small" />
        <input z-input zSize="default" placeholder="Default" />
        <input z-input zSize="lg" placeholder="Large" />
      </div>
    `,
  }),
};

export const Statuses: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 320px;">
        <input z-input placeholder="Default (no status)" />
        <input z-input zStatus="error" placeholder="Error" />
        <input z-input zStatus="warning" placeholder="Warning" />
        <input z-input zStatus="success" placeholder="Success" />
      </div>
    `,
  }),
};

export const Borderless: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 320px;">
        <input z-input [zBorderless]="true" placeholder="Borderless input" />
        <input z-input placeholder="Normal input for comparison" />
      </div>
    `,
  }),
};
