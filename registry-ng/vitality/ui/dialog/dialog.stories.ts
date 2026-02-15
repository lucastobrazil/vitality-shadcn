import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { Component, inject } from "@angular/core";

import { ZardDialogService } from "./dialog.service";
import { ZardButtonComponent } from "@/ui/button/button.component";

@Component({
  selector: "story-dialog-default",
  standalone: true,
  imports: [ZardButtonComponent],
  template: `<button z-button (click)="open()">Open Dialog</button>`,
})
class StoryDialogDefaultComponent {
  private readonly dialogService = inject(ZardDialogService);

  open() {
    this.dialogService.create({
      zTitle: "Edit Profile",
      zDescription:
        "Make changes to your profile here. Click save when you're done.",
      zContent: "<p>Your profile content goes here.</p>",
      zOkText: "Save changes",
      zCancelText: "Cancel",
    });
  }
}

const meta: Meta<StoryDialogDefaultComponent> = {
  title: "UI/Dialog",
  component: StoryDialogDefaultComponent,
  decorators: [
    moduleMetadata({
      imports: [StoryDialogDefaultComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<StoryDialogDefaultComponent>;

export const Default: Story = {};
