import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { Component, inject } from "@angular/core";

import { ZardAlertDialogService } from "./alert-dialog.service";
import { ZardButtonComponent } from "@/ui/button/button.component";

@Component({
  selector: "story-alert-dialog-default",
  standalone: true,
  imports: [ZardButtonComponent],
  template: `<button z-button (click)="open()">Open Alert Dialog</button>`,
})
class StoryAlertDialogDefaultComponent {
  private readonly alertDialogService = inject(ZardAlertDialogService);

  open() {
    this.alertDialogService.create({
      zTitle: "Are you absolutely sure?",
      zDescription:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      zOkText: "Continue",
      zCancelText: "Cancel",
      zOkDestructive: true,
    });
  }
}

const meta: Meta<StoryAlertDialogDefaultComponent> = {
  title: "UI/AlertDialog",
  component: StoryAlertDialogDefaultComponent,
  decorators: [
    moduleMetadata({
      imports: [StoryAlertDialogDefaultComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<StoryAlertDialogDefaultComponent>;

export const Default: Story = {};
