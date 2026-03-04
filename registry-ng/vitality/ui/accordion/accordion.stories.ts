import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardAccordionComponent } from "./accordion.component";
import { ZardAccordionItemComponent } from "./accordion-item.component";

const meta: Meta<ZardAccordionComponent> = {
  title: "UI/Accordion",
  component: ZardAccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardAccordionComponent, ZardAccordionItemComponent],
    }),
  ],
  argTypes: {
    zType: {
      control: "select",
      options: ["single", "multiple"],
    },
    zCollapsible: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<ZardAccordionComponent>;

export const Single: Story = {
  render: () => ({
    template: `
      <z-accordion zType="single" [zCollapsible]="true" style="max-width: 500px;">
        <z-accordion-item zValue="item-1" zTitle="Is it accessible?">
          Yes. It adheres to the WAI-ARIA design pattern.
        </z-accordion-item>
        <z-accordion-item zValue="item-2" zTitle="Is it styled?">
          Yes. It comes with default styles that match the other components' aesthetic.
        </z-accordion-item>
        <z-accordion-item zValue="item-3" zTitle="Is it animated?">
          Yes. It uses CSS grid transitions for smooth expand/collapse animations.
        </z-accordion-item>
      </z-accordion>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    template: `
      <z-accordion zType="multiple" [zCollapsible]="true" style="max-width: 500px;">
        <z-accordion-item zValue="item-1" zTitle="First Section">
          Content for the first section. Multiple items can be open at the same time.
        </z-accordion-item>
        <z-accordion-item zValue="item-2" zTitle="Second Section">
          Content for the second section. Try opening this while the first is open.
        </z-accordion-item>
        <z-accordion-item zValue="item-3" zTitle="Third Section">
          Content for the third section. All three can be expanded simultaneously.
        </z-accordion-item>
      </z-accordion>
    `,
  }),
};

export const NonCollapsible: Story = {
  render: () => ({
    template: `
      <z-accordion zType="single" [zCollapsible]="false" zDefaultValue="item-1" style="max-width: 500px;">
        <z-accordion-item zValue="item-1" zTitle="Always one open">
          This accordion requires at least one item to remain open at all times.
        </z-accordion-item>
        <z-accordion-item zValue="item-2" zTitle="Click to switch">
          Clicking another item switches the selection but you cannot close all items.
        </z-accordion-item>
        <z-accordion-item zValue="item-3" zTitle="Third item">
          The non-collapsible mode ensures one item is always visible.
        </z-accordion-item>
      </z-accordion>
    `,
  }),
};

export const WithDefaultOpen: Story = {
  render: () => ({
    template: `
      <z-accordion zType="single" [zCollapsible]="true" zDefaultValue="item-2" style="max-width: 500px;">
        <z-accordion-item zValue="item-1" zTitle="First Item">
          This item starts closed.
        </z-accordion-item>
        <z-accordion-item zValue="item-2" zTitle="Second Item (Default Open)">
          This item starts open because it matches the default value.
        </z-accordion-item>
        <z-accordion-item zValue="item-3" zTitle="Third Item">
          This item also starts closed.
        </z-accordion-item>
      </z-accordion>
    `,
  }),
};
