import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardContextMenuDirective } from "./context-menu.directive";
import { ZardMenuContentDirective } from "./menu-content.directive";
import { ZardMenuItemDirective } from "./menu-item.directive";
import { ZardMenuLabelComponent } from "./menu-label.component";
import { ZardMenuShortcutComponent } from "./menu-shortcut.component";

const meta: Meta<ZardContextMenuDirective> = {
  title: "UI/ContextMenu",
  component: ZardContextMenuDirective,
  decorators: [
    moduleMetadata({
      imports: [
        ZardContextMenuDirective,
        ZardMenuContentDirective,
        ZardMenuItemDirective,
        ZardMenuLabelComponent,
        ZardMenuShortcutComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardContextMenuDirective>;

export const Default: Story = {
  render: () => ({
    template: `
      <div style="display: flex; justify-content: center; padding: 40px;">
        <ng-template #contextMenuTemplate>
          <div z-menu-content>
            <button z-menu-item>
              Back
              <z-menu-shortcut>Alt+Left</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Forward
              <z-menu-shortcut>Alt+Right</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Reload
              <z-menu-shortcut>Ctrl+R</z-menu-shortcut>
            </button>
            <button z-menu-item>
              View Source
              <z-menu-shortcut>Ctrl+U</z-menu-shortcut>
            </button>
            <button z-menu-item>
              Inspect
              <z-menu-shortcut>F12</z-menu-shortcut>
            </button>
          </div>
        </ng-template>

        <div
          z-context-menu
          [zContextMenuTriggerFor]="contextMenuTemplate"
          style="display: flex; align-items: center; justify-content: center; width: 400px; height: 200px; border: 2px dashed hsl(var(--border)); border-radius: 8px; color: hsl(var(--muted-foreground)); font-size: 14px; user-select: none;"
        >
          Right-click here to open context menu
        </div>
      </div>
    `,
  }),
};
