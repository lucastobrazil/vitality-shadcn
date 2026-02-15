import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardSkeletonComponent } from "./skeleton.component";

const meta: Meta<ZardSkeletonComponent> = {
  title: "UI/Skeleton",
  component: ZardSkeletonComponent,
  decorators: [
    moduleMetadata({
      imports: [ZardSkeletonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardSkeletonComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-skeleton class="h-4 w-[250px]"></z-skeleton>`,
  }),
};

export const CardLayout: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 350px;">
        <z-skeleton class="h-[125px] w-full rounded-xl"></z-skeleton>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <z-skeleton class="h-4 w-[250px]"></z-skeleton>
          <z-skeleton class="h-4 w-[200px]"></z-skeleton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <z-skeleton class="h-10 w-10 rounded-full"></z-skeleton>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <z-skeleton class="h-4 w-[150px]"></z-skeleton>
            <z-skeleton class="h-3 w-[100px]"></z-skeleton>
          </div>
        </div>
      </div>
    `,
  }),
};
