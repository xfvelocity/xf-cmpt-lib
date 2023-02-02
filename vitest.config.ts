import { resolve } from "path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

const r = (p: string): string => resolve(__dirname, p);

export default defineConfig({
  resolve: {
    alias: {
      "~": r("."),
      "@": r("."),
      "~/": r("./"),
      "@/": r("./"),
    },
  },
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      lines: 80,
      branches: 80,
      functions: 80,
      statements: 80,
    },
  },
});
