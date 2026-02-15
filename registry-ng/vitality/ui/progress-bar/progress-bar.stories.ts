import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardProgressBarComponent } from "./progress-bar.component";

const meta: Meta<ZardProgressBarComponent> = {
  title: "UI/ProgressBar",
  component: ZardProgressBarComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardProgressBarComponent],
    }),
  ],
  argTypes: {
    progress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    zType: {
      control: "select",
      options: ["default", "destructive", "accent"],
    },
    zSize: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    zShape: {
      control: "select",
      options: ["default", "square"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardProgressBarComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-progress-bar [progress]="progress" [zType]="zType" [zSize]="zSize" [zShape]="zShape" />`,
  }),
  args: {
    progress: 60,
    zType: "default",
    zSize: "default",
    zShape: "default",
  },
};

export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <z-progress-bar [progress]="60" zType="default" />
        <z-progress-bar [progress]="45" zType="destructive" />
        <z-progress-bar [progress]="80" zType="accent" />
      </div>
    `,
  }),
};

export const Indeterminate: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <z-progress-bar [zIndeterminate]="true" zType="default" />
        <z-progress-bar [zIndeterminate]="true" zType="destructive" />
        <z-progress-bar [zIndeterminate]="true" zType="accent" />
      </div>
    `,
  }),
};
