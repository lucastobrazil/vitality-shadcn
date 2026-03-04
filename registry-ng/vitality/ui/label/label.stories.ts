import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ZardLabelComponent } from './label.component';
import { ZardInputDirective } from '../input/input.directive';

const meta: Meta<ZardLabelComponent> = {
  title: 'UI/Label',
  component: ZardLabelComponent,
  decorators: [moduleMetadata({ imports: [ZardLabelComponent, ZardInputDirective] })],
};
export default meta;
type Story = StoryObj<ZardLabelComponent>;

export const Default: Story = {
  render: () => ({
    template: `<label z-label>Email address</label>`,
  }),
};

export const WithInput: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <label z-label for="email">Email</label>
        <input z-input id="email" type="email" placeholder="you@example.com" />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <div class="group" data-disabled="true" style="display: flex; flex-direction: column; gap: 6px;">
        <label z-label>Disabled label</label>
      </div>
    `,
  }),
};
