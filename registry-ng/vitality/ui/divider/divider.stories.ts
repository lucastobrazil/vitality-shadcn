import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardDividerComponent } from "./divider.component";

const meta: Meta<ZardDividerComponent> = {
  title: "UI/Divider",
  component: ZardDividerComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardDividerComponent],
    }),
  ],
  argTypes: {
    zOrientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    zSpacing: {
      control: "select",
      options: ["none", "sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardDividerComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div>
        <p>Content above</p>
        <z-divider [zOrientation]="zOrientation" [zSpacing]="zSpacing"></z-divider>
        <p>Content below</p>
      </div>
    `,
  }),
  args: {
    zOrientation: "horizontal",
    zSpacing: "default",
  },
};

export const Horizontal: Story = {
  render: () => ({
    template: `
      <div>
        <p>First section</p>
        <z-divider zOrientation="horizontal"></z-divider>
        <p>Second section</p>
        <z-divider zOrientation="horizontal"></z-divider>
        <p>Third section</p>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; height: 40px; gap: 0;">
        <span>Home</span>
        <z-divider zOrientation="vertical" zSpacing="default"></z-divider>
        <span>About</span>
        <z-divider zOrientation="vertical" zSpacing="default"></z-divider>
        <span>Contact</span>
      </div>
    `,
  }),
};

export const Spacings: Story = {
  render: () => ({
    template: `
      <div>
        <p style="font-weight: 600; font-size: 12px; margin-bottom: 8px;">Spacing: none</p>
        <p>Above</p>
        <z-divider zOrientation="horizontal" zSpacing="none"></z-divider>
        <p>Below</p>

        <br />

        <p style="font-weight: 600; font-size: 12px; margin-bottom: 8px;">Spacing: sm</p>
        <p>Above</p>
        <z-divider zOrientation="horizontal" zSpacing="sm"></z-divider>
        <p>Below</p>

        <br />

        <p style="font-weight: 600; font-size: 12px; margin-bottom: 8px;">Spacing: default</p>
        <p>Above</p>
        <z-divider zOrientation="horizontal" zSpacing="default"></z-divider>
        <p>Below</p>

        <br />

        <p style="font-weight: 600; font-size: 12px; margin-bottom: 8px;">Spacing: lg</p>
        <p>Above</p>
        <z-divider zOrientation="horizontal" zSpacing="lg"></z-divider>
        <p>Below</p>
      </div>
    `,
  }),
};
