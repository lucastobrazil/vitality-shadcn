import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardTooltipDirective, ZardTooltipComponent } from "./tooltip";

const meta: Meta<ZardTooltipDirective> = {
  title: "UI/Tooltip",
  component: ZardTooltipDirective,
  decorators: [
    moduleMetadata({
      imports: [ZardTooltipDirective, ZardTooltipComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardTooltipDirective>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 80px;">
        <button
          z-button
          zTooltip="This is a tooltip"
          zTrigger="hover"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Hover me
        </button>
      </div>
    `,
  }),
};

export const Positions: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; justify-content: center; padding: 100px; flex-wrap: wrap;">
        <button
          zTooltip="Tooltip on top"
          zPosition="top"
          zTrigger="hover"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Top
        </button>
        <button
          zTooltip="Tooltip on bottom"
          zPosition="bottom"
          zTrigger="hover"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Bottom
        </button>
        <button
          zTooltip="Tooltip on left"
          zPosition="left"
          zTrigger="hover"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Left
        </button>
        <button
          zTooltip="Tooltip on right"
          zPosition="right"
          zTrigger="hover"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Right
        </button>
      </div>
    `,
  }),
};

export const ClickTrigger: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 80px;">
        <button
          zTooltip="Click-triggered tooltip"
          zTrigger="click"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Click me
        </button>
      </div>
    `,
  }),
};
