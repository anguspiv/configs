# @angusp/eslint-config

Flat config presets for ESLint 9+. Each preset is self-contained — pick one that matches your project type.

## Installation

```sh
pnpm add -D @angusp/eslint-config eslint
# TypeScript projects also need:
pnpm add -D typescript
```

## Architecture

Internally two base layers are composed in every preset:

```
_javascript.js   @eslint/js recommended + common rules
_typescript.js   extends _javascript + typescript-eslint recommended
```

These are not public exports. Each named preset (`/javascript`, `/typescript`, `/node`, `/react`, `/vue`) builds on these bases and always ends with `eslint-config-prettier` to disable any formatting rules that conflict with Prettier.

::: warning
Do not import `@angusp/eslint-config` without a subpath — there is no default export. Always use a named preset.
:::

## Presets

### `/javascript`

Plain JavaScript projects. No TypeScript rules.

**Includes:** `@eslint/js` recommended, `eslint-config-prettier`

**Rules:**
| Rule | Setting |
| --- | --- |
| `no-unused-vars` | warn, ignores `_`-prefixed args |
| `no-console` | warn |

```js
// eslint.config.js
import javascript from '@angusp/eslint-config/javascript'

export default [...javascript]
```

---

### `/typescript`

TypeScript projects. Extends the JavaScript preset.

**Adds:** `typescript-eslint` recommended

**Additional rules:**
| Rule | Setting |
| --- | --- |
| `no-unused-vars` | off (delegated to TS variant) |
| `@typescript-eslint/no-unused-vars` | warn, ignores `_`-prefixed args |
| `@typescript-eslint/no-explicit-any` | warn |
| `@typescript-eslint/consistent-type-imports` | error — enforces `import type` |

```js
// eslint.config.js
import typescript from '@angusp/eslint-config/typescript'

export default [...typescript]
```

::: tip
`consistent-type-imports` pairs with `verbatimModuleSyntax: true` in `@angusp/tsconfig` — TypeScript will also enforce this at compile time.
:::

---

### `/node`

Node.js TypeScript projects. Extends the TypeScript preset.

**Adds:** `eslint-plugin-n` flat/recommended

**Overrides:**
| Rule | Setting | Reason |
| --- | --- | --- |
| `n/no-missing-import` | off | TypeScript handles module resolution |

```js
// eslint.config.js
import node from '@angusp/eslint-config/node'

export default [...node]
```

---

### `/react`

React TypeScript projects. Extends the TypeScript preset.

**Peer dependencies:**
```sh
pnpm add -D eslint  # already required
```
All React plugins are bundled as dependencies — no additional installs needed.

**Adds:**
- `eslint-plugin-react` flat recommended + JSX runtime config
- `eslint-plugin-react-hooks` recommended-latest (ESLint 9 flat config)
- `eslint-plugin-jsx-a11y` recommended

**Settings:** `react.version` is auto-detected.

```js
// eslint.config.js
import react from '@angusp/eslint-config/react'

export default [...react]
```

---

### `/vue`

Vue 3 TypeScript projects. Extends the TypeScript preset.

**Adds:**
- `eslint-plugin-vue` flat/recommended
- `typescript-eslint` parser wired into Vue's `parserOptions.parser` for `<script lang="ts">` blocks

**Rules:**
| Rule | Setting |
| --- | --- |
| `vue/multi-word-component-names` | warn |
| `vue/block-order` | error — enforces `<script>`, `<template>`, `<style>` order |

```js
// eslint.config.js
import vue from '@angusp/eslint-config/vue'

export default [...vue]
```

## Extending a Preset

Append your own rules after spreading the preset array:

```js
// eslint.config.js
import react from '@angusp/eslint-config/react'

export default [
  ...react,
  {
    rules: {
      'no-console': 'error', // override from warn to error
    },
  },
]
```

## Ignoring Files

```js
// eslint.config.js
import react from '@angusp/eslint-config/react'
import { defineConfig } from 'eslint'

export default defineConfig([
  { ignores: ['dist/', 'coverage/'] },
  ...react,
])
```
