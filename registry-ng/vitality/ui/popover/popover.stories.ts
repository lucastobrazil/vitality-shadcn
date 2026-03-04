import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardPopoverDirective, ZardPopoverComponent } from "./popover.component";

const meta: Meta<ZardPopoverDirective> = {
  title: "UI/Popover",
  component: ZardPopoverDirective,
  decorators: [
    moduleMetadata({
      imports: [ZardPopoverDirective, ZardPopoverComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardPopoverDirective>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 120px;">
        <ng-template #popoverContent>
          <z-popover>
            <div style="display: grid; gap: 16px;">
              <div>
                <h4 style="font-weight: 500; margin: 0 0 4px 0; font-size: 14px;">Dimensions</h4>
                <p style="margin: 0; font-size: 13px; color: hsl(var(--muted-foreground));">Set the dimensions for the layer.</p>
              </div>
              <div style="display: grid; gap: 8px;">
                <div style="display: flex; align-items: center; gap: 16px;">
                  <label style="font-size: 13px; min-width: 60px;">Width</label>
                  <input value="100%" style="padding: 4px 8px; border: 1px solid hsl(var(--border)); border-radius: 4px; font-size: 13px; width: 100%; background: hsl(var(--background));" />
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                  <label style="font-size: 13px; min-width: 60px;">Height</label>
                  <input value="25px" style="padding: 4px 8px; border: 1px solid hsl(var(--border)); border-radius: 4px; font-size: 13px; width: 100%; background: hsl(var(--background));" />
                </div>
              </div>
            </div>
          </z-popover>
        </ng-template>
        <button
          [zPopover]
          [zContent]="popoverContent"
          zTrigger="click"
          zPlacement="bottom"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Open Popover
        </button>
      </div>
    `,
  }),
};

export const Placements: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; justify-content: center; padding: 160px; flex-wrap: wrap;">
        <ng-template #topContent>
          <z-popover>
            <p style="margin: 0; font-size: 13px;">Popover on top</p>
          </z-popover>
        </ng-template>
        <ng-template #bottomContent>
          <z-popover>
            <p style="margin: 0; font-size: 13px;">Popover on bottom</p>
          </z-popover>
        </ng-template>
        <ng-template #leftContent>
          <z-popover>
            <p style="margin: 0; font-size: 13px;">Popover on left</p>
          </z-popover>
        </ng-template>
        <ng-template #rightContent>
          <z-popover>
            <p style="margin: 0; font-size: 13px;">Popover on right</p>
          </z-popover>
        </ng-template>

        <button
          [zPopover]
          [zContent]="topContent"
          zTrigger="click"
          zPlacement="top"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Top
        </button>
        <button
          [zPopover]
          [zContent]="bottomContent"
          zTrigger="click"
          zPlacement="bottom"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Bottom
        </button>
        <button
          [zPopover]
          [zContent]="leftContent"
          zTrigger="click"
          zPlacement="left"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Left
        </button>
        <button
          [zPopover]
          [zContent]="rightContent"
          zTrigger="click"
          zPlacement="right"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Right
        </button>
      </div>
    `,
  }),
};

export const HoverTrigger: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 120px;">
        <ng-template #hoverContent>
          <z-popover>
            <p style="margin: 0; font-size: 13px;">This popover opens on hover.</p>
          </z-popover>
        </ng-template>
        <button
          [zPopover]
          [zContent]="hoverContent"
          zTrigger="hover"
          zPlacement="bottom"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Hover me
        </button>
      </div>
    `,
  }),
};
