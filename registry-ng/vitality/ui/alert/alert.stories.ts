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
    zSeverity: {
      control: "select",
      options: ["muted", "destructive", "warning", "success", "info", "brand"],
    },
    zSize: {
      control: "select",
      options: ["default", "compact", "blockCompact"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardAlertComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-alert [zSeverity]="zSeverity" [zSize]="zSize" [zTitle]="zTitle" [zDescription]="zDescription"></z-alert>`,
  }),
  args: {
    zSeverity: "muted",
    zSize: "default",
    zTitle: "Heads up!",
    zDescription: "You can add components to your app using the CLI.",
  },
};

export const Destructive: Story = {
  render: () => ({
    template: `
      <z-alert
        zSeverity="destructive"
        zTitle="Error"
        zDescription="Your session has expired. Please log in again."
      ></z-alert>
    `,
  }),
};

export const Warning: Story = {
  render: () => ({
    template: `
      <z-alert
        zSeverity="warning"
        zTitle="Warning"
        zDescription="This action may have unintended consequences."
      ></z-alert>
    `,
  }),
};

export const Success: Story = {
  render: () => ({
    template: `
      <z-alert
        zSeverity="success"
        zTitle="Success"
        zDescription="Your changes have been saved successfully."
      ></z-alert>
    `,
  }),
};

export const Info: Story = {
  render: () => ({
    template: `
      <z-alert
        zSeverity="info"
        zTitle="Information"
        zDescription="This is an informational alert with helpful context."
      ></z-alert>
    `,
  }),
};

export const Brand: Story = {
  render: () => ({
    template: `
      <z-alert
        zSeverity="brand"
        zTitle="Brand"
        zDescription="Check out our latest feature updates and improvements."
      ></z-alert>
    `,
  }),
};

export const Compact: Story = {
  render: () => ({
    template: `
      <z-alert
        zSeverity="muted"
        zSize="compact"
        zTitle="Compact Alert"
        zDescription="This alert uses the compact size variant."
      ></z-alert>
    `,
  }),
};

export const BlockCompact: Story = {
  render: () => ({
    template: `
      <z-alert
        zSeverity="muted"
        zSize="blockCompact"
        zTitle="Block Compact Alert"
        zDescription="This alert uses the blockCompact size variant."
      ></z-alert>
    `,
  }),
};

export const WithIcon: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <z-alert
          zSeverity="info"
          zIcon="info"
          zTitle="Information"
          zDescription="This is an informational alert with a custom icon."
        ></z-alert>
        <z-alert
          zSeverity="destructive"
          zTitle="Destructive with auto icon"
          zDescription="Destructive alerts automatically show a circle-alert icon."
        ></z-alert>
        <z-alert
          zSeverity="muted"
          zIcon="terminal"
          zTitle="Terminal"
          zDescription="You can run commands in the terminal to get started."
        ></z-alert>
      </div>
    `,
  }),
};
