import type { Meta, StoryObj } from "@storybook/angular";
import { applicationConfig, moduleMetadata } from "@storybook/angular";
import { provideRouter } from "@angular/router";
import {
  ZardBreadcrumbComponent,
  ZardBreadcrumbItemComponent,
  ZardBreadcrumbEllipsisComponent,
} from "./breadcrumb.component";

const meta: Meta<ZardBreadcrumbComponent> = {
  title: "UI/Breadcrumb",
  component: ZardBreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ZardBreadcrumbComponent,
        ZardBreadcrumbItemComponent,
        ZardBreadcrumbEllipsisComponent,
      ],
    }),
    applicationConfig({ providers: [provideRouter([])] }),
  ],
  argTypes: {
    zSize: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    zAlign: {
      control: "select",
      options: ["start", "center", "end"],
    },
    zWrap: {
      control: "select",
      options: ["wrap", "nowrap"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardBreadcrumbComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <z-breadcrumb>
        <z-breadcrumb-item [routerLink]="['/']">Home</z-breadcrumb-item>
        <z-breadcrumb-item [routerLink]="['/components']">Components</z-breadcrumb-item>
        <z-breadcrumb-item [routerLink]="['/components/breadcrumb']">Breadcrumb</z-breadcrumb-item>
      </z-breadcrumb>
    `,
  }),
};

export const WithEllipsis: Story = {
  render: () => ({
    template: `
      <z-breadcrumb>
        <z-breadcrumb-item [routerLink]="['/']">Home</z-breadcrumb-item>
        <z-breadcrumb-item>
          <z-breadcrumb-ellipsis />
        </z-breadcrumb-item>
        <z-breadcrumb-item [routerLink]="['/components']">Components</z-breadcrumb-item>
        <z-breadcrumb-item [routerLink]="['/components/breadcrumb']">Breadcrumb</z-breadcrumb-item>
      </z-breadcrumb>
    `,
  }),
};
