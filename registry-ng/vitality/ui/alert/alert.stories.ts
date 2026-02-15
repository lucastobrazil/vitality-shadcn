import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardAlertComponent } from "./alert.component";

const meta: Meta<ZardAlertComponent> = {
  title: "UI/Alert",
  component: ZardAlertComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardAlertComponent],
    }),
  ],
  argTypes: {
    zType: {
      control: "select",
      options: ["default", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardAlertComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-alert [zType]="zType" [zTitle]="zTitle" [zDescription]="zDescription"></z-alert>`,
  }),
  args: {
    zType: "default",
    zTitle: "Heads up!",
    zDescription: "You can add components to your app using the CLI.",
  },
};

export const Destructive: Story = {
  render: () => ({
    template: `
      <z-alert
        zType="destructive"
        zTitle="Error"
        zDescription="Your session has expired. Please log in again."
      ></z-alert>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <z-alert
          zType="default"
          zIcon="info"
          zTitle="Information"
          zDescription="This is an informational alert with a custom icon."
        ></z-alert>
        <z-alert
          zType="destructive"
          zTitle="Destructive with auto icon"
          zDescription="Destructive alerts automatically show a circle-alert icon."
        ></z-alert>
        <z-alert
          zType="default"
          zIcon="terminal"
          zTitle="Terminal"
          zDescription="You can run commands in the terminal to get started."
        ></z-alert>
      </div>
    `,
  }),
};
