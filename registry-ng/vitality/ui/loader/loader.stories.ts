import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardLoaderComponent } from "./loader.component";

const meta: Meta<ZardLoaderComponent> = {
  title: "UI/Loader",
  component: ZardLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardLoaderComponent],
    }),
  ],
  argTypes: {
    zSize: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardLoaderComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-loader [zSize]="zSize" />`,
  }),
  args: {
    zSize: "default",
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center;">
        <z-loader zSize="sm" />
        <z-loader zSize="default" />
        <z-loader zSize="lg" />
      </div>
    `,
  }),
};
