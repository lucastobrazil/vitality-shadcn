import type { StorybookConfig } from "@storybook/angular";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import webpack from "webpack";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  framework: "@storybook/angular",
  stories: ["./docs/**/*.mdx", "../vitality/ui/**/*.stories.ts"],
  staticDirs: ["./public"],
  addons: [
    "@storybook/addon-docs",
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

    // addon-styling-webpack strips Angular's CSS rules (?ngResource / ?ngGlobalStyle)
    // and replaces them with a flat /\.css$/ rule. This breaks Angular component styles.
    // Fix: exclude component styles from the addon's rule and re-add a handler for them.
    const rules = config.module?.rules ?? [];
    for (const rule of rules) {
      if (rule && typeof rule === "object" && "test" in rule) {
        if (rule.test?.toString() === "/\\.css$/") {
          rule.resourceQuery = { not: [/ngResource/] };
        }
      }
    }

    // Handle Angular component styles (?ngResource) as raw CSS strings
    rules.push({
      test: /\.css$/,
      resourceQuery: /\?ngResource/,
      type: "asset/source",
    });

    // Expose NEXT_PUBLIC_REGISTRY_URL to the preview bundle
    config.plugins ??= [];
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.NEXT_PUBLIC_REGISTRY_URL": JSON.stringify(
          process.env.NEXT_PUBLIC_REGISTRY_URL || ""
        ),
      })
    );

    return config;
  },
};

export default config;
