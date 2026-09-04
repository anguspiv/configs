# @angusp/prettier-config

A single opinionated Prettier config. No presets — one set of defaults for all project types.

## Installation

```sh
pnpm add -D @angusp/prettier-config prettier
```

## Options

| Option          | Value   | Rationale                                                         |
| --------------- | ------- | ----------------------------------------------------------------- |
| `semi`          | `false` | No semicolons — cleaner diffs                                     |
| `singleQuote`   | `true`  | Single quotes for JS/TS strings                                   |
| `trailingComma` | `'all'` | Trailing commas everywhere — cleaner git diffs on multi-line args |
| `printWidth`    | `100`   | Wider than Prettier's 80 default, narrower than common 120        |
| `tabWidth`      | `2`     | 2 spaces                                                          |
| `useTabs`       | `false` | Spaces                                                            |

## Usage

### Method 1 — `package.json` reference

The simplest approach. Prettier resolves the package and reads the exported config object.

```json
{
  "prettier": "@angusp/prettier-config"
}
```

### Method 2 — JS config with overrides

Use a `prettier.config.js` (or `.prettierrc.js`) when you need to override specific options for your project.

```js
// prettier.config.js
import angusPrettier from "@angusp/prettier-config";

export default {
  ...angusPrettier,
  printWidth: 120,
};
```

## ESLint Integration

All `@angusp/eslint-config` presets already include `eslint-config-prettier` as the final layer. This disables any ESLint formatting rules that would conflict with Prettier.

::: tip
You do **not** need to install `eslint-config-prettier` yourself — it is bundled and applied automatically.
:::
