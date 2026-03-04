import type { Meta, StoryObj } from "@storybook/angular";
import { moduleMetadata } from "@storybook/angular";
import {
  ZardFormFieldComponent,
  ZardFormControlComponent,
  ZardFormLabelComponent,
  ZardFormMessageComponent,
} from "./form.component";
import { ZardInputDirective } from "@/ui/input/input.directive";

const meta: Meta<ZardFormFieldComponent> = {
  title: "UI/Form",
  component: ZardFormFieldComponent,
  decorators: [
    moduleMetadata({
      imports: [
        ZardFormFieldComponent,
        ZardFormControlComponent,
        ZardFormLabelComponent,
        ZardFormMessageComponent,
        ZardInputDirective,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<ZardFormFieldComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <z-form-field style="max-width: 320px;">
        <label z-form-label>Email</label>
        <z-form-control helpText="We'll never share your email.">
          <input z-input placeholder="you@example.com" />
        </z-form-control>
        <z-form-message>Enter your email address.</z-form-message>
      </z-form-field>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <z-form-field style="max-width: 320px;">
        <label z-form-label [zRequired]="true">Email</label>
        <z-form-control errorMessage="This field is required.">
          <input z-input zStatus="error" placeholder="you@example.com" />
        </z-form-control>
        <z-form-message zType="error">Please enter a valid email address.</z-form-message>
      </z-form-field>
    `,
  }),
};

export const WithRequired: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px; max-width: 320px;">
        <z-form-field>
          <label z-form-label [zRequired]="true">Full Name</label>
          <z-form-control>
            <input z-input placeholder="John Doe" />
          </z-form-control>
          <z-form-message>Your full name as it appears on official documents.</z-form-message>
        </z-form-field>

        <z-form-field>
          <label z-form-label [zRequired]="true">Email</label>
          <z-form-control>
            <input z-input placeholder="you@example.com" />
          </z-form-control>
        </z-form-field>

        <z-form-field>
          <label z-form-label>Bio</label>
          <z-form-control helpText="Max 250 characters.">
            <textarea z-input placeholder="Tell us about yourself..."></textarea>
          </z-form-control>
        </z-form-field>
      </div>
    `,
  }),
};
