import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardDatePickerComponent } from "./date-picker.component";

const meta: Meta<ZardDatePickerComponent> = {
  title: "UI/DatePicker",
  component: ZardDatePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardDatePickerComponent],
    }),
  ],
  argTypes: {
    zSize: {
      control: "select",
      options: ["xs", "sm", "default", "lg"],
    },
    zType: {
      control: "select",
      options: ["default", "outline", "ghost"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardDatePickerComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <z-date-picker placeholder="Pick a date" />
    `,
  }),
};

export const WithMinMax: Story = {
  render: () => ({
    props: {
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2025, 11, 31),
    },
    template: `
      <z-date-picker
        placeholder="Select a date (2024-2025)"
        [minDate]="minDate"
        [maxDate]="maxDate"
      />
    `,
  }),
};
