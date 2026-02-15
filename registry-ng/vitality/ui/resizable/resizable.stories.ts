import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardResizableComponent } from "./resizable.component";
import { ZardResizablePanelComponent } from "./resizable-panel.component";
import { ZardResizableHandleComponent } from "./resizable-handle.component";

const meta: Meta<ZardResizableComponent> = {
  title: "UI/Resizable",
  component: ZardResizableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ZardResizableComponent,
        ZardResizablePanelComponent,
        ZardResizableHandleComponent,
      ],
    }),
  ],
  argTypes: {
    zLayout: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardResizableComponent>;

export const Horizontal: Story = {
  render: () => ({
    template: `
      <z-resizable zLayout="horizontal" style="height: 200px; max-width: 600px; border: 1px solid var(--border); border-radius: 0.5rem; overflow: hidden;">
        <z-resizable-panel [zDefaultSize]="50">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Panel One</span>
          </div>
        </z-resizable-panel>
        <z-resizable-handle [zWithHandle]="true" [zHandleIndex]="0" />
        <z-resizable-panel [zDefaultSize]="50">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Panel Two</span>
          </div>
        </z-resizable-panel>
      </z-resizable>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <z-resizable zLayout="vertical" style="height: 400px; max-width: 600px; border: 1px solid var(--border); border-radius: 0.5rem; overflow: hidden;">
        <z-resizable-panel [zDefaultSize]="30">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Header</span>
          </div>
        </z-resizable-panel>
        <z-resizable-handle [zWithHandle]="true" [zHandleIndex]="0" />
        <z-resizable-panel [zDefaultSize]="40">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Content</span>
          </div>
        </z-resizable-panel>
        <z-resizable-handle [zWithHandle]="true" [zHandleIndex]="1" />
        <z-resizable-panel [zDefaultSize]="30">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Footer</span>
          </div>
        </z-resizable-panel>
      </z-resizable>
    `,
  }),
};
