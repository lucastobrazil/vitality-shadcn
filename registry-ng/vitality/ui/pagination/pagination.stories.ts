import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import {
  ZardPaginationComponent,
  ZardPaginationContentComponent,
  ZardPaginationItemComponent,
  ZardPaginationButtonComponent,
  ZardPaginationPreviousComponent,
  ZardPaginationNextComponent,
  ZardPaginationEllipsisComponent,
} from "./pagination.component";

const meta: Meta<ZardPaginationComponent> = {
  title: "UI/Pagination",
  component: ZardPaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ZardPaginationComponent,
        ZardPaginationContentComponent,
        ZardPaginationItemComponent,
        ZardPaginationButtonComponent,
        ZardPaginationPreviousComponent,
        ZardPaginationNextComponent,
        ZardPaginationEllipsisComponent,
      ],
    }),
  ],
  argTypes: {
    zTotal: {
      control: "number",
    },
    zPageIndex: {
      control: "number",
    },
    zSize: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    zDisabled: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<ZardPaginationComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <z-pagination [zTotal]="10" [zPageIndex]="1" />
    `,
  }),
};
