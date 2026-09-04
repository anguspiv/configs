import nPlugin from "eslint-plugin-n";
import prettierConfig from "eslint-config-prettier";
import tsBase from "./_typescript.js";

export default [
  ...tsBase,
  nPlugin.configs["flat/recommended"],
  {
    rules: {
      "n/no-missing-import": "off", // TypeScript handles module resolution
    },
  },
  prettierConfig,
];
