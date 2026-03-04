import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardSliderComponent } from "./slider.component";

const meta: Meta<ZardSliderComponent> = {
  title: "UI/Slider",
  component: ZardSliderComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardSliderComponent],
    }),
  ],
  argTypes: {
    zMin: {
      control: "number",
    },
    zMax: {
      control: "number",
    },
    zStep: {
      control: "number",
    },
    zDefault: {
      control: "number",
    },
  },
};

export default meta;
type Story = StoryObj<ZardSliderComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 300px; padding: 20px;">
        <z-slider [zMin]="zMin" [zMax]="zMax" [zStep]="zStep" [zDefault]="zDefault"></z-slider>
      </div>
    `,
  }),
  args: {
    zMin: 0,
    zMax: 100,
    zStep: 1,
    zDefault: 50,
  },
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div style="width: 300px; padding: 20px;">
        <z-slider [zMin]="0" [zMax]="100" [zDefault]="40" [zDisabled]="true"></z-slider>
      </div>
    `,
  }),
};
