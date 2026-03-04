import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardComboboxComponent } from "./combobox.component";

const meta: Meta<ZardComboboxComponent> = {
  title: "UI/Combobox",
  component: ZardComboboxComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardComboboxComponent],
    }),
  ],
  argTypes: {
    zWidth: {
      control: "select",
      options: ["sm", "default", "md", "lg", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardComboboxComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      options: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
        { value: "vue", label: "Vue" },
        { value: "svelte", label: "Svelte" },
        { value: "solid", label: "Solid" },
      ],
    },
    template: `<z-combobox [options]="options" [placeholder]="placeholder" [zWidth]="zWidth" [searchable]="searchable" />`,
  }),
  args: {
    placeholder: "Select framework...",
    zWidth: "default",
    searchable: true,
  },
};

export const WithGroups: Story = {
  render: () => ({
    props: {
      groups: [
        {
          label: "Frontend",
          options: [
            { value: "react", label: "React" },
            { value: "angular", label: "Angular" },
            { value: "vue", label: "Vue" },
          ],
        },
        {
          label: "Backend",
          options: [
            { value: "express", label: "Express" },
            { value: "nestjs", label: "NestJS" },
            { value: "fastify", label: "Fastify" },
          ],
        },
      ],
    },
    template: `<z-combobox [groups]="groups" placeholder="Select a framework..." />`,
  }),
};

export const Disabled: Story = {
  render: () => ({
    props: {
      options: [
        { value: "react", label: "React" },
        { value: "angular", label: "Angular" },
      ],
    },
    template: `<z-combobox [options]="options" [disabled]="true" placeholder="Disabled combobox" />`,
  }),
};
