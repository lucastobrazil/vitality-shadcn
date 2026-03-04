import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import { ZardCarouselComponent } from "./carousel.component";
import { ZardCarouselContentComponent } from "./carousel-content.component";
import { ZardCarouselItemComponent } from "./carousel-item.component";

const meta: Meta<ZardCarouselComponent> = {
  title: "UI/Carousel",
  component: ZardCarouselComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ZardCarouselComponent,
        ZardCarouselContentComponent,
        ZardCarouselItemComponent,
      ],
    }),
  ],
  argTypes: {
    zOrientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    zControls: {
      control: "select",
      options: ["none", "button", "dot"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardCarouselComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <div class="mx-auto max-w-xs">
        <z-carousel>
          <z-carousel-content>
            <z-carousel-item>
              <div class="flex aspect-square items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">1</span>
              </div>
            </z-carousel-item>
            <z-carousel-item>
              <div class="flex aspect-square items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">2</span>
              </div>
            </z-carousel-item>
            <z-carousel-item>
              <div class="flex aspect-square items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">3</span>
              </div>
            </z-carousel-item>
            <z-carousel-item>
              <div class="flex aspect-square items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">4</span>
              </div>
            </z-carousel-item>
            <z-carousel-item>
              <div class="flex aspect-square items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">5</span>
              </div>
            </z-carousel-item>
          </z-carousel-content>
        </z-carousel>
      </div>
    `,
  }),
};

export const Vertical: Story = {
  render: () => ({
    template: `
      <div class="mx-auto max-w-xs">
        <z-carousel zOrientation="vertical" class="w-full">
          <z-carousel-content class="h-[200px]">
            <z-carousel-item>
              <div class="flex h-full items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">1</span>
              </div>
            </z-carousel-item>
            <z-carousel-item>
              <div class="flex h-full items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">2</span>
              </div>
            </z-carousel-item>
            <z-carousel-item>
              <div class="flex h-full items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">3</span>
              </div>
            </z-carousel-item>
            <z-carousel-item>
              <div class="flex h-full items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">4</span>
              </div>
            </z-carousel-item>
            <z-carousel-item>
              <div class="flex h-full items-center justify-center rounded-lg border bg-card p-6">
                <span class="text-4xl font-semibold">5</span>
              </div>
            </z-carousel-item>
          </z-carousel-content>
        </z-carousel>
      </div>
    `,
  }),
};
