#!/usr/bin/env node
/**
 * Publishes all non-private workspace packages to npm with the correct dist-tag:
 *   - Prerelease versions (x.y.z-*) → "next"
 *   - Stable versions (x.y.z)       → "latest"
 *
 * Idempotent: a version already on the registry is skipped rather than
 * attempted, so re-running a release — a retry, a re-triggered workflow, or a
 * version published by hand — succeeds instead of going red for no reason.
 * The check is an unauthenticated read, so a run with nothing left to do needs
 * no credentials at all.
 */
import { execSync } from 'child_process'
import { readFileSync, readdirSync, statSync } from 'fs'
import { join } from 'path'

/** Whether this exact name@version already exists on the registry. */
function isPublished(name, version) {
  try {
    const found = execSync(`npm view ${name}@${version} version`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return found === version
  } catch {
    // A 404 means the package or that version does not exist yet.
    return false
  }
}

const PACKAGES_DIR = 'packages'

const packages = readdirSync(PACKAGES_DIR).filter((d) =>
  statSync(join(PACKAGES_DIR, d)).isDirectory(),
)

let failed = false
let skipped = 0
let published = 0

for (const dir of packages) {
  const pkgPath = join(PACKAGES_DIR, dir, 'package.json')
  const { name, version, private: isPrivate } = JSON.parse(readFileSync(pkgPath, 'utf8'))

  if (isPrivate) continue

  if (isPublished(name, version)) {
    console.log(`\nSkipping ${name}@${version} — already on the registry`)
    skipped += 1
    continue
  }

  const isPrerelease = version.includes('-')
  const tag = isPrerelease ? 'next' : 'latest'

  console.log(`\nPublishing ${name}@${version} → tag: ${tag}`)
  try {
    execSync(`pnpm publish --filter "${name}" --no-git-checks --tag ${tag}`, {
      stdio: 'inherit',
    })
    published += 1
  } catch {
    console.error(`Failed to publish ${name}`)
    failed = true
  }
}

console.log(`\n${published} published, ${skipped} already on the registry`)

if (failed) process.exit(1)
