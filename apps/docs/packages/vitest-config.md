# @angusp/vitest-config

Factory functions that return Vitest config objects. Mirrors the shape of `@angusp/vite-config`.

## Installation

```sh
pnpm add -D @angusp/vitest-config vitest
```

Plugin peer dependencies are optional:

```sh
# React projects
pnpm add -D @vitejs/plugin-react

# Vue projects
pnpm add -D @vitejs/plugin-vue
```

For browser environment testing you also need:

```sh
pnpm add -D jsdom
```

## Exports

### `@angusp/vitest-config` → `createBaseConfig`

Node.js environment. No framework plugin. Use for utility libraries or pure TypeScript packages.

**Defaults:**

| Option              | Value                        |
| ------------------- | ---------------------------- |
| `globals`           | `true`                       |
| `environment`       | `node`                       |
| `coverage.provider` | `v8`                         |
| `coverage.reporter` | `['text', 'lcov']`           |
| `coverage.exclude`  | `['node_modules/', 'dist/']` |

```js
// vitest.config.js
import { createBaseConfig } from "@angusp/vitest-config";

export default createBaseConfig();
```

With overrides:

```js
import { createBaseConfig } from "@angusp/vitest-config";

export default createBaseConfig({
  test: {
    include: ["src/**/*.test.ts"],
    coverage: {
      exclude: ["node_modules/", "dist/", "src/generated/"],
    },
  },
});
```

---

### `@angusp/vitest-config/react` → `createReactConfig`

Extends `createBaseConfig`. Switches environment to `jsdom` and adds `@vitejs/plugin-react`.

**Peer dependencies:** `@vitejs/plugin-react >= 6.0.0`, `jsdom`

```js
// vitest.config.js
import { createReactConfig } from "@angusp/vitest-config/react";

export default createReactConfig();
```

---

### `@angusp/vitest-config/vue` → `createVueConfig`

Extends `createBaseConfig`. Switches environment to `jsdom` and adds `@vitejs/plugin-vue`.

**Peer dependencies:** `@vitejs/plugin-vue >= 6.0.0`, `jsdom`

```js
// vitest.config.js
import { createVueConfig } from "@angusp/vitest-config/vue";

export default createVueConfig();
```

## Coverage

`lcov` output is included by default for integration with CI coverage tools (Codecov, Coveralls, etc.). Run coverage with:

```sh
vitest run --coverage
```

::: tip Separate `vitest.config.js` from `vite.config.js`
If your project uses both `@angusp/vite-config` and `@angusp/vitest-config`, keep them in separate files. Both use the same `mergeConfig` pattern internally, and mixing them in a single config file can lead to unexpected plugin duplication.
:::
