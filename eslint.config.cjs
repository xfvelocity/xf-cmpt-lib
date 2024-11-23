/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
    "plugin:storybook/recommended",
    "plugin:vitest-globals/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2022,
  },
  globals: {
    vi: true,
  },
  env: {
    "vitest-globals/env": true,
  },
  files: [".vue", ".js", ".ts"],
};
