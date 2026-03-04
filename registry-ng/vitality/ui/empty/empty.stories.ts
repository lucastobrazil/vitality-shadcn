import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardEmptyComponent } from "./empty.component";

const meta: Meta<ZardEmptyComponent> = {
  title: "UI/Empty",
  component: ZardEmptyComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardEmptyComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardEmptyComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <z-empty
        [zTitle]="zTitle"
        [zIcon]="zIcon"
      ></z-empty>
    `,
  }),
  args: {
    zTitle: "No results found",
    zIcon: "inbox",
  },
};

export const WithDescription: Story = {
  render: () => ({
    template: `
      <z-empty
        zIcon="search"
        zTitle="No results found"
        zDescription="Try adjusting your search or filter to find what you're looking for."
      ></z-empty>
    `,
  }),
};
