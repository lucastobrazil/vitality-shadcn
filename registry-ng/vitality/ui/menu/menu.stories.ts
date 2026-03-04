import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardMenuDirective } from "./menu.directive";
import { ZardMenuContentDirective } from "./menu-content.directive";
import { ZardMenuItemDirective } from "./menu-item.directive";
import { ZardMenuLabelComponent } from "./menu-label.component";
import { ZardMenuShortcutComponent } from "./menu-shortcut.component";

const meta: Meta<ZardMenuDirective> = {
  title: "UI/Menu",
  component: ZardMenuDirective,
  decorators: [
    moduleMetadata({
      imports: [
        ZardMenuDirective,
        ZardMenuContentDirective,
        ZardMenuItemDirective,
        ZardMenuLabelComponent,
        ZardMenuShortcutComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardMenuDirective>;

export const ClickMenu: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 40px;">
        <ng-template #menuTemplate>
          <div z-menu-content>
            <div z-menu-label>My Account</div>
            <button z-menu-item>
              Profile
              <z-menu-shortcut>Ctrl+P</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Settings
              <z-menu-shortcut>Ctrl+S</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Billing
              <z-menu-shortcut>Ctrl+B</z-menu-shortcut>
            </button>
            <button z-menu-item [zDisabled]="true">
              Invite (coming soon)
            </button>
            <button z-menu-item zType="destructive">
              Log out
              <z-menu-shortcut>Ctrl+Q</z-menu-shortcut>
            </button>
          </div>
        </ng-template>

        <button
          z-menu
          [zMenuTriggerFor]="menuTemplate"
          zTrigger="click"
          zPlacement="bottomLeft"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Open Menu
        </button>
      </div>
    `,
  }),
};

export const HoverMenu: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; gap: 16px; padding: 40px;">
        <ng-template #fileMenu>
          <div z-menu-content>
            <div z-menu-label>File</div>
            <button z-menu-item>
              New File
              <z-menu-shortcut>Ctrl+N</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Open
              <z-menu-shortcut>Ctrl+O</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Save
              <z-menu-shortcut>Ctrl+S</z-menu-shortcut>
            </button>
          </div>
        </ng-template>

        <ng-template #editMenu>
          <div z-menu-content>
            <div z-menu-label>Edit</div>
            <button z-menu-item>
              Undo
              <z-menu-shortcut>Ctrl+Z</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Redo
              <z-menu-shortcut>Ctrl+Y</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Cut
              <z-menu-shortcut>Ctrl+X</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Copy
              <z-menu-shortcut>Ctrl+C</z-menu-shortcut>
            </button>
          </div>
        </ng-template>

        <button
          z-menu
          [zMenuTriggerFor]="fileMenu"
          zTrigger="hover"
          zPlacement="bottomLeft"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          File
        </button>
        <button
          z-menu
          [zMenuTriggerFor]="editMenu"
          zTrigger="hover"
          zPlacement="bottomLeft"
          style="padding: 8px 16px; border-radius: 6px; border: 1px solid hsl(var(--border)); background: hsl(var(--background)); cursor: pointer;"
        >
          Edit
        </button>
      </div>
    `,
  }),
};
