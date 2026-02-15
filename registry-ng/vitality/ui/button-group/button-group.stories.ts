import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import {
  ZardButtonGroupComponent,
  ZardButtonGroupDividerComponent,
  ZardButtonGroupTextDirective,
} from "./button-group.component";
import { ZardButtonComponent } from "../button/button.component";

const meta: Meta<ZardButtonGroupComponent> = {
  title: "UI/ButtonGroup",
  component: ZardButtonGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ZardButtonGroupComponent,
        ZardButtonGroupDividerComponent,
        ZardButtonGroupTextDirective,
        ZardButtonComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardButtonGroupComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <z-button-group>
        <button z-button zType="outline">Left</button>
        <button z-button zType="outline">Center</button>
        <button z-button zType="outline">Right</button>
      </z-button-group>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <z-button-group zOrientation="vertical">
        <button z-button zType="outline">Top</button>
        <button z-button zType="outline">Middle</button>
        <button z-button zType="outline">Bottom</button>
      </z-button-group>
    `,
  }),
};

export const WithDivider: Story = {
  render: () => ({
    template: `
      <z-button-group>
        <button z-button zType="outline">Left</button>
        <z-button-group-divider />
        <button z-button zType="outline">Center</button>
        <z-button-group-divider />
        <button z-button zType="outline">Right</button>
      </z-button-group>
    `,
  }),
};
