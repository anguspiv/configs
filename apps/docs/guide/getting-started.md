# Getting Started

## Prerequisites

| Tool       | Minimum version |
| ---------- | --------------- |
| Node.js    | 20              |
| pnpm       | 10              |
| ESLint     | 9               |
| TypeScript | 5               |
| Vite       | 6               |
| Vitest     | 4               |

## Installation

Packages are independent — install only what you need.

::: code-group

```sh [eslint-config]
pnpm add -D @angusp/eslint-config eslint
```

```sh [prettier-config]
pnpm add -D @angusp/prettier-config prettier
```

```sh [tsconfig]
pnpm add -D @angusp/tsconfig typescript
```

```sh [vite-config]
pnpm add -D @angusp/vite-config vite
```

```sh [vitest-config]
pnpm add -D @angusp/vitest-config vitest
```

:::

## Alpha Releases

All packages are currently published under the `next` dist-tag. Install with:

```sh
pnpm add -D @angusp/eslint-config@next
```

Once stable releases begin the `latest` tag will be used automatically.

## Full Example — React TypeScript Project

Install all packages together with the required peer dependencies:

```sh
pnpm add -D \
  @angusp/eslint-config@next \
  @angusp/prettier-config@next \
  @angusp/tsconfig@next \
  @angusp/vite-config@next \
  @angusp/vitest-config@next \
  eslint typescript prettier vite vitest \
  @vitejs/plugin-react
```

Then wire up each config file:

::: code-group

```js [eslint.config.js]
import react from "@angusp/eslint-config/react";

export default [...react];
```

```json [package.json]
{
  "prettier": "@angusp/prettier-config"
}
```

```json [tsconfig.json]
{
  "extends": "@angusp/tsconfig/react",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

```js [vite.config.js]
import { createReactConfig } from "@angusp/vite-config/react";

export default createReactConfig();
```

```js [vitest.config.js]
import { createReactConfig } from "@angusp/vitest-config/react";

export default createReactConfig();
```

:::

## Full Example — Vue TypeScript Project

```sh
pnpm add -D \
  @angusp/eslint-config@next \
  @angusp/prettier-config@next \
  @angusp/tsconfig@next \
  @angusp/vite-config@next \
  @angusp/vitest-config@next \
  eslint typescript prettier vite vitest \
  @vitejs/plugin-vue
```

::: code-group

```js [eslint.config.js]
import vue from "@angusp/eslint-config/vue";

export default [...vue];
```

```json [tsconfig.json]
{
  "extends": "@angusp/tsconfig/vue",
  "include": ["src", "env.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```

```js [vite.config.js]
import { createVueConfig } from "@angusp/vite-config/vue";

export default createVueConfig();
```

```js [vitest.config.js]
import { createVueConfig } from "@angusp/vitest-config/vue";

export default createVueConfig();
```

:::

## Full Example — Node.js TypeScript Project

```sh
pnpm add -D \
  @angusp/eslint-config@next \
  @angusp/prettier-config@next \
  @angusp/tsconfig@next \
  eslint typescript prettier
```

::: code-group

```js [eslint.config.js]
import node from "@angusp/eslint-config/node";

export default [...node];
```

```json [tsconfig.json]
{
  "extends": "@angusp/tsconfig/node",
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

:::
