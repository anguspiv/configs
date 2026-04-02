# @angusp/vite-config

Factory functions that return Vite `UserConfig` objects. Overrides are deep-merged via Vite's `mergeConfig`.

## Installation

```sh
pnpm add -D @angusp/vite-config vite
```

Plugin peer dependencies are optional — only install what you use:

```sh
# React projects
pnpm add -D @vitejs/plugin-react

# Vue projects
pnpm add -D @vitejs/plugin-vue
```

## Exports

### `@angusp/vite-config` → `createBaseConfig`

Framework-agnostic base. Use for library packages or tools that don't need a framework plugin.

**Defaults:**

| Option | Value |
| --- | --- |
| `build.target` | `esnext` |

```js
// vite.config.js
import { createBaseConfig } from '@angusp/vite-config'

export default createBaseConfig()
```

With overrides:

```js
import { createBaseConfig } from '@angusp/vite-config'

export default createBaseConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
})
```

---

### `@angusp/vite-config/react` → `createReactConfig`

Extends `createBaseConfig`. Pre-wires `@vitejs/plugin-react`.

**Peer dependency:** `@vitejs/plugin-react >= 6.0.0`

```js
// vite.config.js
import { createReactConfig } from '@angusp/vite-config/react'

export default createReactConfig()
```

With overrides:

```js
import { createReactConfig } from '@angusp/vite-config/react'

export default createReactConfig({
  server: { port: 3000 },
  build: { outDir: 'build' },
})
```

---

### `@angusp/vite-config/vue` → `createVueConfig`

Extends `createBaseConfig`. Pre-wires `@vitejs/plugin-vue`.

**Peer dependency:** `@vitejs/plugin-vue >= 6.0.0`

```js
// vite.config.js
import { createVueConfig } from '@angusp/vite-config/vue'

export default createVueConfig()
```

## How Overrides Merge

Overrides are passed to Vite's `mergeConfig`, which:

- **Concatenates arrays** — plugins you add are appended after the preset's plugins
- **Overwrites scalars** — a string or number in your overrides replaces the preset's value
- **Deep merges objects** — nested objects like `build` are merged recursively

```js
import { createReactConfig } from '@angusp/vite-config/react'
import svgr from 'vite-plugin-svgr'

export default createReactConfig({
  // svgr is appended — @vitejs/plugin-react is still included
  plugins: [svgr()],
})
```
