import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
  core: { builder: "@storybook/builder-vite" },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public/img"],
};
export default config;
