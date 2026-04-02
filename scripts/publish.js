#!/usr/bin/env node
/**
 * Publishes all non-private workspace packages to npm with the correct dist-tag:
 *   - Prerelease versions (x.y.z-*) → "next"
 *   - Stable versions (x.y.z)       → "latest"
 */
import { execSync } from 'child_process'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

const PACKAGES_DIR = 'packages'

const packages = readdirSync(PACKAGES_DIR).filter((d) =>
  statSync(join(PACKAGES_DIR, d)).isDirectory(),
)

let failed = false

for (const dir of packages) {
  const pkgPath = join(PACKAGES_DIR, dir, 'package.json')
  const { name, version, private: isPrivate } = JSON.parse(readFileSync(pkgPath, 'utf8'))

  if (isPrivate) continue

  const isPrerelease = version.includes('-')
  const tag = isPrerelease ? 'next' : 'latest'

  console.log(`\nPublishing ${name}@${version} → tag: ${tag}`)
  try {
    execSync(`pnpm publish --filter "${name}" --no-git-checks --tag ${tag}`, {
      stdio: 'inherit',
    })
  } catch {
    console.error(`Failed to publish ${name}`)
    failed = true
  }
}

if (failed) process.exit(1)
