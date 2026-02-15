import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardCalendarComponent } from "./calendar.component";

const meta: Meta<ZardCalendarComponent> = {
  title: "UI/Calendar",
  component: ZardCalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardCalendarComponent],
    }),
  ],
  argTypes: {
    zMode: {
      control: "select",
      options: ["single", "multiple", "range"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardCalendarComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-calendar [zMode]="zMode" />`,
  }),
  args: {
    zMode: "single",
  },
};

export const Range: Story = {
  render: () => ({
    template: `<z-calendar zMode="range" />`,
  }),
};

export const Multiple: Story = {
  render: () => ({
    template: `<z-calendar zMode="multiple" />`,
  }),
};
