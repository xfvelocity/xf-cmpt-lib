import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import * as path from "path";
import typescript2 from "rollup-plugin-typescript2";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  publicDir: command === "build" ? false : "public",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData(source, fp) {
          if (fp.endsWith("variables.scss")) return source;
          return `@import "@/assets/styles/variables.scss"; ${source}`;
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
  ],

  build: {
    cssCodeSplit: true,
    lib: {
      entry: "src/index.ts",
      name: "index",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "src/index.ts"),
      },
      external: ["vue", "public", "prettier", "storybook"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
}));
