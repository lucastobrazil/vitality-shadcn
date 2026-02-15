import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardInputGroupComponent } from "./input-group.component";
import { ZardInputDirective } from "@/ui/input/input.directive";

const meta: Meta<ZardInputGroupComponent> = {
  title: "UI/InputGroup",
  component: ZardInputGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardInputGroupComponent, ZardInputDirective],
    }),
  ],
  argTypes: {
    zSize: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    zAddonAlign: {
      control: "select",
      options: ["inline", "block"],
    },
    zDisabled: {
      control: "boolean",
    },
    zLoading: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<ZardInputGroupComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <z-input-group [zSize]="zSize" [zDisabled]="zDisabled" [zLoading]="zLoading">
        <input z-input placeholder="Enter text..." />
      </z-input-group>
    `,
  }),
  args: {
    zSize: "default",
    zDisabled: false,
    zLoading: false,
  },
};

export const WithAddonBefore: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px;">
        <z-input-group zAddonBefore="https://">
          <input z-input placeholder="example.com" />
        </z-input-group>
        <z-input-group zAddonBefore="$">
          <input z-input placeholder="0.00" />
        </z-input-group>
        <z-input-group zAddonBefore="@">
          <input z-input placeholder="username" />
        </z-input-group>
      </div>
    `,
  }),
};

export const WithAddonAfter: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px;">
        <z-input-group zAddonAfter=".com">
          <input z-input placeholder="example" />
        </z-input-group>
        <z-input-group zAddonAfter="kg">
          <input z-input placeholder="Weight" />
        </z-input-group>
        <z-input-group zAddonBefore="$" zAddonAfter="USD">
          <input z-input placeholder="0.00" />
        </z-input-group>
      </div>
    `,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px;">
        <z-input-group [zLoading]="true">
          <input z-input placeholder="Loading..." />
        </z-input-group>
        <z-input-group [zLoading]="true" zAddonBefore="https://">
          <input z-input placeholder="Loading with addon..." />
        </z-input-group>
      </div>
    `,
  }),
};
