const js = require("@eslint/js");
const globals = require("globals");
const tseslint = require("typescript-eslint");
const vue = require("eslint-plugin-vue");
const vueParser = require("vue-eslint-parser");

module.exports = tseslint.config(
  { ignores: ["**/node_modules/**", "**/dist/**", "**/coverage/**", "assets/**", "eslint.config.js", "src/**", "test/**", "packages/shared/src/domain/core.ts"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: { parser: tseslint.parser, sourceType: "module", extraFileExtensions: [".vue"] }
    }
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      "vue/multi-word-component-names": "off"
    }
  }
);
