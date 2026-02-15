import type { StorybookConfig } from "@storybook/angular";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  framework: "@storybook/angular",
  stories: ["../vitality/ui/**/*.stories.ts"],
  addons: [
    "@storybook/addon-themes",
    {
      name: "@storybook/addon-styling-webpack",
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              "style-loader",
              { loader: "css-loader", options: { importLoaders: 1 } },
              {
                loader: "postcss-loader",
                options: {
                  postcssOptions: {
                    plugins: { "@tailwindcss/postcss": {} },
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
  webpackFinal: async (config) => {
    config.resolve ??= {};
    config.resolve.plugins ??= [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "tsconfig.json"),
      })
    );
    return config;
  },
};

export default config;
