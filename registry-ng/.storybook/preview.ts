import type { Preview } from "@storybook/angular";
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    docs: {
      extractArgTypes: () => null,
      codePanel: true
    },
  },
};

export default preview;
