import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

const vitalityTheme = create({
  base: "light",
  brandImage: "./logo_storybook.svg",
  // Brand
  brandTitle: "Vitality UI",
  brandUrl: "/",

  // Colors
  colorPrimary: "#006d72",
  colorSecondary: "#006d72",

  // UI
  appBg: "#f5f5f5",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#e5e5e5",
  appBorderRadius: 4,

  // Text
  textColor: "#0a0a0a",
  textInverseColor: "#fafafa",
  textMutedColor: "#737373",

  // Toolbar
  barTextColor: "#737373",
  barSelectedColor: "#006d72",
  barHoverColor: "#006d72",
  barBg: "#ffffff",

  // Form
  inputBg: "#ffffff",
  inputBorder: "#e5e5e5",
  inputTextColor: "#0a0a0a",
  inputBorderRadius: 4,

  // Booleans
  booleanBg: "#e5e5e5",
  booleanSelectedBg: "#006d72",
});

addons.setConfig({
  theme: vitalityTheme,
});
