#!/usr/bin/env node
/**
 * Publishes all non-private workspace packages to npm.
 *
 * These packages use STAGED publishing: their trusted publisher connections
 * allow `npm stage publish` only, not `npm publish`. CI stages each version and
 * a human approves it in npm → Staged Packages before it reaches consumers.
 * Running `pnpm publish` here would be rejected by the registry.
 *
 * Dist-tags: prerelease (x.y.z-*) → "next", stable (x.y.z) → "latest".
 *
 * Idempotent. A version that is already published OR already staged is skipped,
 * so a re-run — a retry, a re-triggered workflow, a second push before
 * approval — is a no-op rather than a duplicate or a failure. Both checks are
 * unauthenticated reads, so a run with nothing to do needs no credentials.
 */
import { execSync } from "child_process";
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const PACKAGES_DIR = "packages";

const read = (cmd, cwd) =>
  execSync(cmd, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"], cwd });

/** Whether this exact name@version is already live on the registry. */
function isPublished(name, version) {
  try {
    return read(`npm view ${name}@${version} version`).trim() === version;
  } catch {
    // A 404 means the package, or that version, does not exist yet.
    return false;
  }
}

/**
 * Whether this exact name@version is already staged awaiting approval.
 *
 * `npm stage list` rejects version specifiers, so the whole list for the
 * package is fetched and matched here. The entry schema is undocumented and the
 * list was empty when this was written, so the match is deliberately defensive:
 * any string field equal to the version counts. Narrow it once a populated
 * entry has been seen.
 */
function isStaged(name, version) {
  try {
    const entries = JSON.parse(read(`npm stage list ${name} --json`));
    if (!Array.isArray(entries)) return false;
    return entries.some((entry) =>
      Object.values(entry ?? {}).some((value) => value === version),
    );
  } catch {
    return false;
  }
}

const packages = readdirSync(PACKAGES_DIR).filter((d) =>
  statSync(join(PACKAGES_DIR, d)).isDirectory(),
);

let failed = false;
let staged = 0;
let skipped = 0;

for (const dir of packages) {
  const pkgDir = join(PACKAGES_DIR, dir);
  const {
    name,
    version,
    private: isPrivate,
  } = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));

  if (isPrivate) continue;

  if (isPublished(name, version)) {
    console.log(`Skipping ${name}@${version} — already published`);
    skipped += 1;
    continue;
  }

  if (isStaged(name, version)) {
    console.log(
      `Skipping ${name}@${version} — already staged, awaiting approval`,
    );
    skipped += 1;
    continue;
  }

  const tag = version.includes("-") ? "next" : "latest";

  console.log(`\nStaging ${name}@${version} → tag: ${tag}`);
  try {
    // Run from the package directory: `npm stage publish` reads the package.json
    // in cwd, and npm cannot resolve pnpm workspaces via -w.
    execSync(`npm stage publish --tag ${tag}`, {
      stdio: "inherit",
      cwd: pkgDir,
    });
    staged += 1;
  } catch {
    console.error(`Failed to stage ${name}`);
    failed = true;
  }
}

console.log(`\n${staged} staged, ${skipped} already published or staged`);
if (staged > 0) {
  console.log(
    "Approve them at https://www.npmjs.com/settings/angusp/staged-packages",
  );
}

if (failed) process.exit(1);
