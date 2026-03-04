import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardKbdComponent } from "./kbd.component";
import { ZardKbdGroupComponent } from "./kbd-group.component";

const meta: Meta<ZardKbdComponent> = {
  title: "UI/Kbd",
  component: ZardKbdComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardKbdComponent, ZardKbdGroupComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardKbdComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <z-kbd>K</z-kbd>
        <z-kbd>Shift</z-kbd>
        <z-kbd>Enter</z-kbd>
        <z-kbd>Tab</z-kbd>
      </div>
    `,
  }),
};

export const Combinations: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 14px; min-width: 80px;">Copy:</span>
          <z-kbd-group>
            <z-kbd>Ctrl</z-kbd>
            <z-kbd>C</z-kbd>
          </z-kbd-group>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 14px; min-width: 80px;">Paste:</span>
          <z-kbd-group>
            <z-kbd>Ctrl</z-kbd>
            <z-kbd>V</z-kbd>
          </z-kbd-group>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 14px; min-width: 80px;">Save:</span>
          <z-kbd-group>
            <z-kbd>Ctrl</z-kbd>
            <z-kbd>S</z-kbd>
          </z-kbd-group>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 14px; min-width: 80px;">Search:</span>
          <z-kbd-group>
            <z-kbd>Ctrl</z-kbd>
            <z-kbd>Shift</z-kbd>
            <z-kbd>F</z-kbd>
          </z-kbd-group>
        </div>
      </div>
    `,
  }),
};
