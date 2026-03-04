import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardSelectComponent } from "./select.component";
import { ZardSelectItemComponent } from "./select-item.component";

const meta: Meta<ZardSelectComponent> = {
  title: "UI/Select",
  component: ZardSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardSelectComponent, ZardSelectItemComponent],
    }),
  ],
  argTypes: {
    zSize: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardSelectComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 280px;">
        <z-select [zPlaceholder]="zPlaceholder" [zSize]="zSize">
          <z-select-item zValue="apple">Apple</z-select-item>
          <z-select-item zValue="banana">Banana</z-select-item>
          <z-select-item zValue="cherry">Cherry</z-select-item>
          <z-select-item zValue="grape">Grape</z-select-item>
        </z-select>
      </div>
    `,
  }),
  args: {
    zPlaceholder: "Select a fruit...",
    zSize: "default",
  },
};

export const Multiple: Story = {
  render: () => ({
    template: `
      <div style="max-width: 280px;">
        <z-select [zMultiple]="true" zPlaceholder="Select fruits...">
          <z-select-item zValue="apple">Apple</z-select-item>
          <z-select-item zValue="banana">Banana</z-select-item>
          <z-select-item zValue="cherry">Cherry</z-select-item>
          <z-select-item zValue="grape">Grape</z-select-item>
          <z-select-item zValue="mango">Mango</z-select-item>
        </z-select>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="max-width: 280px;">
        <z-select [zDisabled]="true" zPlaceholder="Disabled select">
          <z-select-item zValue="one">Option One</z-select-item>
          <z-select-item zValue="two">Option Two</z-select-item>
        </z-select>
      </div>
    `,
  }),
};
