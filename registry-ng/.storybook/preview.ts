import type { Preview } from "@storybook/angular";
import { withThemeByClassName } from "@storybook/addon-themes";
import { DocsPage } from "./docs-page";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
  //👇 Enables auto-generated documentation for all stories
tags: ['autodocs'],
  parameters: {
    docs: {
      extractArgTypes: () => null,
      codePanel: true,
      page: DocsPage,
    },
  },
};

export default preview;
