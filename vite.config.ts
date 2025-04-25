import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import * as path from "path";
import typescript2 from "rollup-plugin-typescript2";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => ({
  publicDir: command === "build" ? false : "public",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue: path.resolve("./node_modules/vue"),
    },
  },
  rollupOptions: {
    external: ["vue"],
    dedupe: ["vue"],
    output: {
      globals: {
        vue: "Vue",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
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
    lib: {
      entry: "src/index.ts",
      name: "xf-cmpt-lib",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue"],
      dedupe: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
}));
