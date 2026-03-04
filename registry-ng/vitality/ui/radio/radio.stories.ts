import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardRadioComponent } from "./radio.component";

const meta: Meta<ZardRadioComponent> = {
  title: "UI/Radio",
  component: ZardRadioComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardRadioComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardRadioComponent>;

export const Default: Story = {
  render: () => ({
    template: `<z-radio name="demo" value="option1">Option 1</z-radio>`,
  }),
};

export const RadioGroup: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <z-radio name="group" value="apple">Apple</z-radio>
        <z-radio name="group" value="banana">Banana</z-radio>
        <z-radio name="group" value="cherry">Cherry</z-radio>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <z-radio name="disabled-group" value="enabled">Enabled option</z-radio>
        <z-radio name="disabled-group" value="disabled" [disabled]="true">Disabled option</z-radio>
      </div>
    `,
  }),
};
