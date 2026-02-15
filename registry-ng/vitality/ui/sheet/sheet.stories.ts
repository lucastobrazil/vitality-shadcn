import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { Component, inject } from "@angular/core";

import { ZardSheetService } from "./sheet.service";
import type { ZardSheetVariants } from "./sheet.variants";
import { ZardButtonComponent } from "@/ui/button/button.component";

function createSheetWrapper(
  selectorSuffix: string,
  side: ZardSheetVariants["zSide"],
) {
  @Component({
    selector: `story-sheet-${selectorSuffix}`,
    standalone: true,
    imports: [ZardButtonComponent],
    template: `<button z-button (click)="open()">Open Sheet (${side})</button>`,
  })
  class StorySheetWrapperComponent {
    private readonly sheetService = inject(ZardSheetService);

    open() {
      this.sheetService.create({
        zTitle: "Sheet Title",
        zDescription: "This is a sheet panel sliding from the " + side + " side.",
        zContent: "<p>Sheet content goes here.</p>",
        zSide: side,
        zOkText: "Save",
        zCancelText: "Cancel",
      });
    }
  }

  return StorySheetWrapperComponent;
}

const StorySheetRight = createSheetWrapper("right", "right");
const StorySheetLeft = createSheetWrapper("left", "left");
const StorySheetTop = createSheetWrapper("top", "top");
const StorySheetBottom = createSheetWrapper("bottom", "bottom");

const meta: Meta = {
  title: "UI/Sheet",
  decorators: [
    moduleMetadata({
      imports: [
        StorySheetRight,
        StorySheetLeft,
        StorySheetTop,
        StorySheetBottom,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => ({
    template: `<story-sheet-right></story-sheet-right>`,
  }),
};

export const Right: Story = {
  render: () => ({
    template: `<story-sheet-right></story-sheet-right>`,
  }),
};

export const Left: Story = {
  render: () => ({
    template: `<story-sheet-left></story-sheet-left>`,
  }),
};

export const Top: Story = {
  render: () => ({
    template: `<story-sheet-top></story-sheet-top>`,
  }),
};

export const Bottom: Story = {
  render: () => ({
    template: `<story-sheet-bottom></story-sheet-bottom>`,
  }),
};
