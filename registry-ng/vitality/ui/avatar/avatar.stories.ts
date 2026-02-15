import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardAvatarComponent } from "./avatar.component";
import { ZardAvatarGroupComponent } from "./avatar-group.component";

const meta: Meta<ZardAvatarComponent> = {
  title: "UI/Avatar",
  component: ZardAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardAvatarComponent, ZardAvatarGroupComponent],
    }),
  ],
  argTypes: {
    zShape: {
      control: "select",
      options: ["circle", "rounded", "square"],
    },
    zSize: {
      control: "select",
      options: ["sm", "default", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardAvatarComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-avatar [zShape]="zShape" [zSize]="zSize" zSrc="https://i.pravatar.cc/150?img=1" zAlt="User avatar" zFallback="JD" />`,
  }),
  args: {
    zShape: "circle",
    zSize: "default",
  },
};

export const Fallback: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <z-avatar zFallback="JD" zShape="circle" />
        <z-avatar zFallback="AB" zShape="rounded" />
        <z-avatar zFallback="XY" zShape="square" />
      </div>
    `,
  }),
};

export const Statuses: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <z-avatar zSrc="https://i.pravatar.cc/150?img=1" zAlt="Online" zFallback="ON" zStatus="online" />
        <z-avatar zSrc="https://i.pravatar.cc/150?img=2" zAlt="Offline" zFallback="OF" zStatus="offline" />
        <z-avatar zSrc="https://i.pravatar.cc/150?img=3" zAlt="Do Not Disturb" zFallback="DN" zStatus="doNotDisturb" />
        <z-avatar zSrc="https://i.pravatar.cc/150?img=4" zAlt="Away" zFallback="AW" zStatus="away" />
      </div>
    `,
  }),
};

export const Group: Story = {
  render: () => ({
    template: `
      <z-avatar-group>
        <z-avatar zSrc="https://i.pravatar.cc/150?img=1" zAlt="User 1" zFallback="U1" />
        <z-avatar zSrc="https://i.pravatar.cc/150?img=2" zAlt="User 2" zFallback="U2" />
        <z-avatar zSrc="https://i.pravatar.cc/150?img=3" zAlt="User 3" zFallback="U3" />
        <z-avatar zSrc="https://i.pravatar.cc/150?img=4" zAlt="User 4" zFallback="U4" />
      </z-avatar-group>
    `,
  }),
};
