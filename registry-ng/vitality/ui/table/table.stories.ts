import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import {
  ZardTableComponent,
  ZardTableHeaderComponent,
  ZardTableBodyComponent,
  ZardTableRowComponent,
  ZardTableHeadComponent,
  ZardTableCellComponent,
  ZardTableCaptionComponent,
} from "./table.component";

const meta: Meta<ZardTableComponent> = {
  title: "UI/Table",
  component: ZardTableComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ZardTableComponent,
        ZardTableHeaderComponent,
        ZardTableBodyComponent,
        ZardTableRowComponent,
        ZardTableHeadComponent,
        ZardTableCellComponent,
        ZardTableCaptionComponent,
      ],
    }),
  ],
  argTypes: {
    zType: {
      control: "select",
      options: ["default", "striped", "bordered"],
    },
    zSize: {
      control: "select",
      options: ["default", "compact", "comfortable"],
    },
  },
};

export default meta;
type Story = StoryObj<ZardTableComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <table z-table [zType]="zType" [zSize]="zSize">
        <caption z-table-caption>A list of recent invoices.</caption>
        <thead z-table-header>
          <tr z-table-row>
            <th z-table-head>Invoice</th>
            <th z-table-head>Status</th>
            <th z-table-head>Method</th>
            <th z-table-head style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody z-table-body>
          <tr z-table-row>
            <td z-table-cell class="font-medium">INV001</td>
            <td z-table-cell>Paid</td>
            <td z-table-cell>Credit Card</td>
            <td z-table-cell style="text-align: right;">$250.00</td>
          </tr>
          <tr z-table-row>
            <td z-table-cell class="font-medium">INV002</td>
            <td z-table-cell>Pending</td>
            <td z-table-cell>PayPal</td>
            <td z-table-cell style="text-align: right;">$150.00</td>
          </tr>
          <tr z-table-row>
            <td z-table-cell class="font-medium">INV003</td>
            <td z-table-cell>Unpaid</td>
            <td z-table-cell>Bank Transfer</td>
            <td z-table-cell style="text-align: right;">$350.00</td>
          </tr>
          <tr z-table-row>
            <td z-table-cell class="font-medium">INV004</td>
            <td z-table-cell>Paid</td>
            <td z-table-cell>Credit Card</td>
            <td z-table-cell style="text-align: right;">$450.00</td>
          </tr>
          <tr z-table-row>
            <td z-table-cell class="font-medium">INV005</td>
            <td z-table-cell>Paid</td>
            <td z-table-cell>PayPal</td>
            <td z-table-cell style="text-align: right;">$550.00</td>
          </tr>
        </tbody>
      </table>
    `,
  }),
  args: {
    zType: "default",
    zSize: "default",
  },
};
