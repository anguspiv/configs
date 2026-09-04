# configs — agent instructions

Shared build and lint configuration published as `@angusp/*` packages. Consumed
by other repositories, most immediately `anguspiv/recipe-box`.

```
packages/eslint-config     flat configs: javascript · typescript · node · react · vue
packages/prettier-config
packages/tsconfig          base · node · react · vue
packages/vite-config
packages/vitest-config
apps/docs                  VitePress, private, never published
```

Packages are **independent** — none depends on a sibling, and none uses pnpm's
`workspace:` protocol. Keep it that way: it is what lets the release script use
`npm` rather than `pnpm` without breaking dependency rewriting.

## Commands

```bash
pnpm install
pnpm turbo lint
pnpm format
pnpm changeset            # required for any change to a published package
pnpm lint:changesets
```

## Releasing — read this before touching the pipeline

Three things here are non-obvious and each one has already cost an afternoon.

**1. Changeset descriptions must be conventional commits.**
`scripts/lint-changesets.js` rejects a plain sentence. `feat: Add a React
preset`, not `Added a React preset`.

**2. The "Version Packages" PR must be merged with admin privileges.**

```bash
gh pr merge <n> --squash --admin
```

GitHub does not trigger workflows for events created by `GITHUB_TOKEN`, so a
bot-authored PR never gets check runs and required status checks can never pass.
Its merge state stays `BLOCKED` forever. This is accepted rather than worked
around — the alternative is a long-lived PAT, trading a permanent stored secret
for a CI gate on generated version bumps.

**3. Publishing is staged, not direct.**
Trusted publisher connections on all five packages allow `npm stage publish`
only. `npm publish` and `pnpm publish` are **rejected by the registry**. CI
stages each version; a human then approves it at
`npmjs.com/settings/angusp/staged-packages` before it reaches consumers.

There is no npm token anywhere — CI authenticates by OIDC, which needs
`id-token: write` on the release job.

Full release flow:

```
1. merge a PR carrying a changeset
2. Release opens a "Version Packages" PR
3. admin-merge it
4. Release stages the new versions
5. approve them on npm
```

## Conventions

- Conventional commits; PR titles are validated in CI
- `main` is protected: no force pushes, no deletions, `Lint` and
  `Validate PR title` required
- Every published package is MIT with `publishConfig.access: public`
- Node version comes from `.nvmrc`; CI reads it via `node-version-file`
