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
};

export default meta;
type Story = StoryObj<ZardSwitchComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-switch>Airplane Mode</z-switch>`,
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
