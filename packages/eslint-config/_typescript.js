import tseslint from "typescript-eslint";
import jsBase from "./_javascript.js";

export default tseslint.config(...jsBase, tseslint.configs.recommended, {
  rules: {
    // Delegate to the TS-aware version below
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      { prefer: "type-imports" },
    ],
  },
});
