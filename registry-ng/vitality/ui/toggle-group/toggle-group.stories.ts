import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardToggleGroupComponent } from "./toggle-group.component";

const meta: Meta<ZardToggleGroupComponent> = {
  title: "UI/ToggleGroup",
  component: ZardToggleGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardToggleGroupComponent],
    }),
  ],
  argTypes: {
    zMode: {
      control: "select",
      options: ["single", "multiple"],
    },
    zType: {
      control: "select",
      options: ["default", "outline"],
    },
    zSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardToggleGroupComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      items: [
        { value: "bold", label: "Bold" },
        { value: "italic", label: "Italic" },
        { value: "underline", label: "Underline" },
      ],
    },
    template: `<z-toggle-group [zMode]="zMode" [zType]="zType" [zSize]="zSize" [items]="items"></z-toggle-group>`,
  }),
  args: {
    zMode: "multiple",
    zType: "default",
    zSize: "md",
  },
};

export const Single: Story = {
  render: () => ({
    props: {
      items: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" },
      ],
    },
    template: `<z-toggle-group zMode="single" [items]="items" [defaultValue]="'center'"></z-toggle-group>`,
  }),
};

export const Outline: Story = {
  render: () => ({
    props: {
      items: [
        { value: "bold", label: "Bold" },
        { value: "italic", label: "Italic" },
        { value: "underline", label: "Underline" },
      ],
    },
    template: `<z-toggle-group zType="outline" [items]="items"></z-toggle-group>`,
  }),
};
