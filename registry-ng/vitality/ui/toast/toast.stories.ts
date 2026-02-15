import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { Component } from "@angular/core";
import { toast } from "ngx-sonner";

import { ZardToastComponent } from "./toast.component";
import { ZardButtonComponent } from "@/ui/button/button.component";

@Component({
  selector: "story-toast-default",
  standalone: true,
  imports: [ZardToastComponent, ZardButtonComponent],
  template: `
    <z-toaster />
    <button z-button (click)="showToast()">Show Toast</button>
  `,
})
class StoryToastDefaultComponent {
  showToast() {
    toast("Event has been created.");
  }
}

@Component({
  selector: "story-toast-types",
  standalone: true,
  imports: [ZardToastComponent, ZardButtonComponent],
  template: `
    <z-toaster [richColors]="true" />
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <button z-button (click)="showDefault()">Default</button>
      <button z-button zType="secondary" (click)="showSuccess()">Success</button>
      <button z-button zType="destructive" (click)="showError()">Error</button>
      <button z-button zType="outline" (click)="showInfo()">Info</button>
      <button z-button zType="ghost" (click)="showWarning()">Warning</button>
    </div>
  `,
})
class StoryToastTypesComponent {
  showDefault() {
    toast("Default toast notification.");
  }
  showSuccess() {
    toast.success("Successfully completed the action.");
  }
  showError() {
    toast.error("Something went wrong.");
  }
  showInfo() {
    toast.info("Here is some information.");
  }
  showWarning() {
    toast.warning("Please be careful with this action.");
  }
}

@Component({
  selector: "story-toast-positions",
  standalone: true,
  imports: [ZardToastComponent, ZardButtonComponent],
  template: `
    <z-toaster [position]="position" />
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <button z-button zType="outline" (click)="setPosition('top-left')">Top Left</button>
      <button z-button zType="outline" (click)="setPosition('top-center')">Top Center</button>
      <button z-button zType="outline" (click)="setPosition('top-right')">Top Right</button>
      <button z-button zType="outline" (click)="setPosition('bottom-left')">Bottom Left</button>
      <button z-button zType="outline" (click)="setPosition('bottom-center')">Bottom Center</button>
      <button z-button zType="outline" (click)="setPosition('bottom-right')">Bottom Right</button>
    </div>
  `,
})
class StoryToastPositionsComponent {
  position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right" = "bottom-right";

  setPosition(
    pos: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right",
  ) {
    this.position = pos;
    toast(`Toast at ${pos}`);
  }
}

const meta: Meta = {
  title: "UI/Toast",
  decorators: [
    moduleMetadata({
      imports: [
        StoryToastDefaultComponent,
        StoryToastTypesComponent,
        StoryToastPositionsComponent,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `<story-toast-default></story-toast-default>`,
  }),
};

export const Types: Story = {
  render: () => ({
    template: `<story-toast-types></story-toast-types>`,
  }),
};

export const Positions: Story = {
  render: () => ({
    template: `<story-toast-positions></story-toast-positions>`,
  }),
};
