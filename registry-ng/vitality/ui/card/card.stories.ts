import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardCardComponent } from "./card.component";

const meta: Meta<ZardCardComponent> = {
  title: "UI/Card",
  component: ZardCardComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardCardComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardCardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <z-card [zTitle]="zTitle" [zDescription]="zDescription">
        <p>Card body content goes here. This is a simple card with a title and description.</p>
      </z-card>
    `,
  }),
  args: {
    zTitle: "Card Title",
    zDescription: "Card description goes here.",
  },
};

export const WithAction: Story = {
  render: () => ({
    template: `
      <z-card
        zTitle="Notifications"
        zDescription="You have 3 unread messages."
        zAction="View all"
      >
        <p>Manage your notification preferences and review recent activity.</p>
        <div card-footer>
          <span style="font-size: 12px; color: var(--muted-foreground);">Last updated 2 hours ago</span>
        </div>
      </z-card>
    `,
  }),
};

export const WithFooterBorder: Story = {
  render: () => ({
    template: `
      <z-card
        zTitle="Account Settings"
        zDescription="Update your account preferences."
        [zFooterBorder]="true"
        [zHeaderBorder]="true"
      >
        <p>Your current plan is <strong>Pro</strong>. You have 14 days remaining in your trial.</p>
        <div card-footer>
          <span style="font-size: 14px;">Need help? Contact support for assistance.</span>
        </div>
      </z-card>
    `,
  }),
};
