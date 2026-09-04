# @angusp/tsconfig

Strict TypeScript compiler configs for browser and Node.js targets.

## Installation

```sh
pnpm add -D @angusp/tsconfig typescript
```

## Configs

### `/base`

The strictest baseline. All other configs extend this.

```json
{
  "extends": "@angusp/tsconfig/base"
}
```

**Compiler options:**

| Option                       | Value        | Rationale                                                     |
| ---------------------------- | ------------ | ------------------------------------------------------------- |
| `target`                     | `ESNext`     | Emit modern JS — bundlers handle down-targeting               |
| `module`                     | `ESNext`     | ESM output                                                    |
| `moduleResolution`           | `Bundler`    | Resolves imports the way Vite/esbuild do                      |
| `lib`                        | `["ESNext"]` | No DOM by default — added per target                          |
| `strict`                     | `true`       | Enables all strict type checks                                |
| `noUncheckedIndexedAccess`   | `true`       | Array/object index access returns `T \| undefined`            |
| `exactOptionalPropertyTypes` | `true`       | Distinguishes missing vs `undefined` properties               |
| `noImplicitReturns`          | `true`       | All code paths must return a value                            |
| `noFallthroughCasesInSwitch` | `true`       | No accidental switch fallthrough                              |
| `isolatedModules`            | `true`       | Each file is an independent module — required for esbuild/SWC |
| `verbatimModuleSyntax`       | `true`       | Enforces `import type` for type-only imports                  |
| `skipLibCheck`               | `true`       | Skip type checking of `.d.ts` files                           |
| `declaration`                | `true`       | Emit `.d.ts` files                                            |
| `declarationMap`             | `true`       | Emit `.d.ts.map` for source navigation                        |
| `sourceMap`                  | `true`       | Emit `.js.map` files                                          |

::: tip `verbatimModuleSyntax` and ESLint
`verbatimModuleSyntax: true` requires type-only imports to use `import type`. This pairs with the `@typescript-eslint/consistent-type-imports` rule in `@angusp/eslint-config` — you get both compile-time and lint-time enforcement.
:::

---

### `/react`

Extends `/base`. Adds browser APIs and React JSX support.

```json
{
  "extends": "@angusp/tsconfig/react"
}
```

**Additional options:**

| Option | Value                               |
| ------ | ----------------------------------- |
| `lib`  | `["ESNext", "DOM", "DOM.Iterable"]` |
| `jsx`  | `react-jsx`                         |

---

### `/vue`

Extends `/base`. Adds browser APIs and Vue JSX preservation.

```json
{
  "extends": "@angusp/tsconfig/vue"
}
```

**Additional options:**

| Option | Value                               |
| ------ | ----------------------------------- |
| `lib`  | `["ESNext", "DOM", "DOM.Iterable"]` |
| `jsx`  | `preserve`                          |

::: tip
`jsx: "preserve"` is required for Volar (Vue Language Tools) to handle template compilation correctly.
:::

---

### `/node`

Extends `/base`. Switches to Node.js module resolution.

```json
{
  "extends": "@angusp/tsconfig/node"
}
```

**Overrides:**

| Option             | Value        | Reason                                      |
| ------------------ | ------------ | ------------------------------------------- |
| `module`           | `NodeNext`   | Native Node.js ESM with explicit extensions |
| `moduleResolution` | `NodeNext`   | Matches Node.js resolution algorithm        |
| `lib`              | `["ESNext"]` | No DOM APIs                                 |

## Typical `tsconfig.json`

Always add `include` and `exclude` — the shared config intentionally omits them so you control what gets compiled.

::: code-group

```json [React]
{
  "extends": "@angusp/tsconfig/react",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src", "vite.config.ts"],
  "exclude": ["node_modules", "dist"]
}
```

```json [Vue]
{
  "extends": "@angusp/tsconfig/vue",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["src", "env.d.ts", "vite.config.ts"],
  "exclude": ["node_modules", "dist"]
}
```

```json [Node.js]
{
  "extends": "@angusp/tsconfig/node",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

:::
