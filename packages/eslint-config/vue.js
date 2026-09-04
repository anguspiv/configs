import vuePlugin from "eslint-plugin-vue";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import tsBase from "./_typescript.js";

export default [
  ...tsBase,
  ...vuePlugin.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
        sourceType: "module",
      },
    },
    rules: {
      "vue/multi-word-component-names": "warn",
      "vue/block-order": ["error", { order: ["script", "template", "style"] }],
    },
  },
  prettierConfig,
];
