import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import {
  ZardTabGroupComponent,
  ZardTabComponent,
} from "./tabs.component";

const meta: Meta<ZardTabGroupComponent> = {
  title: "UI/Tabs",
  component: ZardTabGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardTabGroupComponent, ZardTabComponent],
    }),
  ],
  argTypes: {
    zTabsPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    zActivePosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    zAlignTabs: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardTabGroupComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <z-tab-group>
        <z-tab label="Account">
          <div class="p-4">
            <h3 class="text-lg font-medium">Account Settings</h3>
            <p class="text-sm text-muted-foreground mt-1">
              Make changes to your account here. Click save when you're done.
            </p>
          </div>
        </z-tab>
        <z-tab label="Password">
          <div class="p-4">
            <h3 class="text-lg font-medium">Password</h3>
            <p class="text-sm text-muted-foreground mt-1">
              Change your password here. After saving, you'll be logged out.
            </p>
          </div>
        </z-tab>
        <z-tab label="Notifications">
          <div class="p-4">
            <h3 class="text-lg font-medium">Notifications</h3>
            <p class="text-sm text-muted-foreground mt-1">
              Configure how you receive notifications.
            </p>
          </div>
        </z-tab>
      </z-tab-group>
    `,
  }),
};

export const Positions: Story = {
  render: () => ({
    template: `
      <div class="space-y-8">
        <div>
          <p class="text-sm font-medium mb-2">Top (default)</p>
          <z-tab-group zTabsPosition="top">
            <z-tab label="Tab 1"><div class="p-4">Content for Tab 1</div></z-tab>
            <z-tab label="Tab 2"><div class="p-4">Content for Tab 2</div></z-tab>
          </z-tab-group>
        </div>

        <div>
          <p class="text-sm font-medium mb-2">Bottom</p>
          <z-tab-group zTabsPosition="bottom">
            <z-tab label="Tab 1"><div class="p-4">Content for Tab 1</div></z-tab>
            <z-tab label="Tab 2"><div class="p-4">Content for Tab 2</div></z-tab>
          </z-tab-group>
        </div>

        <div>
          <p class="text-sm font-medium mb-2">Left</p>
          <z-tab-group zTabsPosition="left" style="height: 200px;">
            <z-tab label="Tab 1"><div class="p-4">Content for Tab 1</div></z-tab>
            <z-tab label="Tab 2"><div class="p-4">Content for Tab 2</div></z-tab>
          </z-tab-group>
        </div>

        <div>
          <p class="text-sm font-medium mb-2">Right</p>
          <z-tab-group zTabsPosition="right" style="height: 200px;">
            <z-tab label="Tab 1"><div class="p-4">Content for Tab 1</div></z-tab>
            <z-tab label="Tab 2"><div class="p-4">Content for Tab 2</div></z-tab>
          </z-tab-group>
        </div>
      </div>
    `,
  }),
};

export const Bottom: Story = {
  render: () => ({
    template: `
      <z-tab-group zTabsPosition="bottom">
        <z-tab label="Overview">
          <div class="p-4">
            <h3 class="text-lg font-medium">Overview</h3>
            <p class="text-sm text-muted-foreground mt-1">
              A general overview of the project status and key metrics.
            </p>
          </div>
        </z-tab>
        <z-tab label="Analytics">
          <div class="p-4">
            <h3 class="text-lg font-medium">Analytics</h3>
            <p class="text-sm text-muted-foreground mt-1">
              Detailed analytics and performance data.
            </p>
          </div>
        </z-tab>
        <z-tab label="Reports">
          <div class="p-4">
            <h3 class="text-lg font-medium">Reports</h3>
            <p class="text-sm text-muted-foreground mt-1">
              Generated reports and export options.
            </p>
          </div>
        </z-tab>
      </z-tab-group>
    `,
  }),
};
