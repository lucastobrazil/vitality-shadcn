import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ZardStatusBadgeComponent } from './status-badge.component';

const meta: Meta<ZardStatusBadgeComponent> = {
  title: 'UI/StatusBadge',
  component: ZardStatusBadgeComponent,
  decorators: [moduleMetadata({ imports: [ZardStatusBadgeComponent] })],
  argTypes: {
    zColor: { control: 'select', options: ['default', 'neutral'] },
    zSeverity: { control: 'select', options: ['muted', 'destructive', 'warning', 'success', 'info', 'brand'] },
  },
};
export default meta;
type Story = StoryObj<ZardStatusBadgeComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `<z-status-badge [zColor]="zColor" [zSeverity]="zSeverity">Status</z-status-badge>`,
  }),
  args: {
    zColor: 'default',
    zSeverity: 'muted',
  },
};

export const Severities: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <z-status-badge zSeverity="muted">Muted</z-status-badge>
        <z-status-badge zSeverity="destructive">Destructive</z-status-badge>
        <z-status-badge zSeverity="warning">Warning</z-status-badge>
        <z-status-badge zSeverity="success">Success</z-status-badge>
        <z-status-badge zSeverity="info">Info</z-status-badge>
        <z-status-badge zSeverity="brand">Brand</z-status-badge>
      </div>
    `,
  }),
};

export const Colors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px;">
        <z-status-badge zColor="default">Default</z-status-badge>
        <z-status-badge zColor="neutral">Neutral</z-status-badge>
      </div>
    `,
  }),
};
