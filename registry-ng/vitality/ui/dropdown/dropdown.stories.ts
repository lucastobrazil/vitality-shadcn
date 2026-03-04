import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardDropdownMenuComponent } from "./dropdown.component";
import { ZardDropdownMenuItemComponent } from "./dropdown-item.component";
import { ZardDropdownMenuContentComponent } from "./dropdown-menu-content.component";
import { ZardDropdownDirective } from "./dropdown-trigger.directive";

const meta: Meta<ZardDropdownMenuComponent> = {
  title: "UI/Dropdown",
  component: ZardDropdownMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ZardDropdownMenuComponent,
        ZardDropdownMenuItemComponent,
        ZardDropdownMenuContentComponent,
        ZardDropdownDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardDropdownMenuComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 40px;">
        <z-dropdown-menu-content #menuContent>
          <z-dropdown-menu-item>Profile</z-dropdown-menu-item>
          <z-dropdown-menu-item>Settings</z-dropdown-menu-item>
          <z-dropdown-menu-item>Billing</z-dropdown-menu-item>
          <z-dropdown-menu-item>Team</z-dropdown-menu-item>
          <z-dropdown-menu-item>Subscription</z-dropdown-menu-item>
        </z-dropdown-menu-content>

        <button
          [zDropdown]
          [zDropdownMenu]="menuContent"
          zTrigger="click"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Open Menu
        </button>
      </div>
    `,
  }),
};

export const WithDestructiveItem: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 40px;">
        <z-dropdown-menu-content #menuContent>
          <z-dropdown-menu-item>Profile</z-dropdown-menu-item>
          <z-dropdown-menu-item>Settings</z-dropdown-menu-item>
          <z-dropdown-menu-item>Billing</z-dropdown-menu-item>
          <z-dropdown-menu-item variant="destructive">Delete Account</z-dropdown-menu-item>
        </z-dropdown-menu-content>

        <button
          [zDropdown]
          [zDropdownMenu]="menuContent"
          zTrigger="click"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Open Menu
        </button>
      </div>
    `,
  }),
};

export const WithDisabledItem: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 40px;">
        <z-dropdown-menu-content #menuContent>
          <z-dropdown-menu-item>Profile</z-dropdown-menu-item>
          <z-dropdown-menu-item [disabled]="true">Settings (disabled)</z-dropdown-menu-item>
          <z-dropdown-menu-item>Billing</z-dropdown-menu-item>
          <z-dropdown-menu-item variant="destructive">Log out</z-dropdown-menu-item>
        </z-dropdown-menu-content>

        <button
          [zDropdown]
          [zDropdownMenu]="menuContent"
          zTrigger="click"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Open Menu
        </button>
      </div>
    `,
  }),
};
