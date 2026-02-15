import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { LayoutComponent } from "./layout.component";
import { HeaderComponent } from "./header.component";
import { FooterComponent } from "./footer.component";
import { ContentComponent } from "./content.component";
import {
  SidebarComponent,
  SidebarGroupComponent,
  SidebarGroupLabelComponent,
} from "./sidebar.component";

const meta: Meta<LayoutComponent> = {
  title: "UI/Layout",
  component: LayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        ContentComponent,
        SidebarComponent,
        SidebarGroupComponent,
        SidebarGroupLabelComponent,
      ],
    }),
  ],
  argTypes: {
    zDirection: {
      control: "select",
      options: ["auto", "horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<LayoutComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <z-layout style="height: 600px; border: 1px solid var(--border); border-radius: 0.5rem; overflow: hidden;">
        <z-sidebar [zWidth]="220" [zCollapsible]="true">
          <z-sidebar-group>
            <z-sidebar-group-label>Navigation</z-sidebar-group-label>
            <div class="flex flex-col gap-1 px-2">
              <a class="text-sm px-2 py-1.5 rounded-md hover:bg-sidebar-accent cursor-pointer">Dashboard</a>
              <a class="text-sm px-2 py-1.5 rounded-md hover:bg-sidebar-accent cursor-pointer">Projects</a>
              <a class="text-sm px-2 py-1.5 rounded-md hover:bg-sidebar-accent cursor-pointer">Settings</a>
            </div>
          </z-sidebar-group>
        </z-sidebar>
        <z-layout zDirection="vertical">
          <z-header [zHeight]="48">
            <span class="text-sm font-medium">Application Header</span>
          </z-header>
          <z-content>
            <h2 class="text-lg font-semibold mb-2">Main Content</h2>
            <p class="text-sm text-muted-foreground">
              This is the main content area. The layout automatically detects the sidebar
              and switches to a horizontal direction.
            </p>
          </z-content>
          <z-footer [zHeight]="48">
            <span class="text-sm text-muted-foreground">Footer content</span>
          </z-footer>
        </z-layout>
      </z-layout>
    `,
  }),
};
