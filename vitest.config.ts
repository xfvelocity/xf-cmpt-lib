import { resolve } from "path";
import { configDefaults, defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

const r = (p: string): string => resolve(__dirname, p);

export default defineConfig({
  resolve: {
    alias: {
      "~": r("./src"),
      "@": r("./src"),
      "~/": r("./src"),
      "@/": r("./src"),
    },
  },
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      exclude: [
        ...configDefaults.exclude,
        "storybook-static",
        "**/*.ts",
        "**/**.cjs",
        "src/App.vue",
      ],
      thresholds: {
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
    },
  },
});
