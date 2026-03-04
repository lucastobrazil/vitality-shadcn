import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ZardSpinnerComponent } from './spinner.component';

const meta: Meta<ZardSpinnerComponent> = {
  title: 'UI/Spinner',
  component: ZardSpinnerComponent,
  decorators: [moduleMetadata({ imports: [ZardSpinnerComponent] })],
  argTypes: {
    zSize: { control: 'select', options: ['sm', 'default', 'lg', 'xl'] },
    zColor: { control: 'select', options: ['default', 'primary', 'secondary'] },
  },
};
export default meta;
type Story = StoryObj<ZardSpinnerComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-spinner [zSize]="zSize" [zColor]="zColor" />`,
  }),
  args: {
    zSize: 'default',
    zColor: 'default',
  },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <z-spinner zSize="sm" />
        <z-spinner zSize="default" />
        <z-spinner zSize="lg" />
        <z-spinner zSize="xl" />
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 16px;">
        <z-spinner zColor="default" />
        <z-spinner zColor="primary" />
        <z-spinner zColor="secondary" />
      </div>
    `,
  }),
};
