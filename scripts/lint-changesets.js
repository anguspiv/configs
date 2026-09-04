#!/usr/bin/env node
/**
 * Validates that all changeset files have summaries following conventional commits format.
 *
 * Changeset format:
 *   ---
 *   "@angusp/package": minor
 *   ---
 *   feat: Description of the change
 */
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

// Matches: type(scope)!: Subject  — subject may start with a capital letter
const CONVENTIONAL_RE =
  /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([^)]+\))?(!)?: \S.+/;

const CHANGESET_DIR = ".changeset";

const files = readdirSync(CHANGESET_DIR).filter(
  (f) => f.endsWith(".md") && f !== "README.md",
);

if (files.length === 0) {
  console.log("No changeset files found.");
  process.exit(0);
}

let failed = false;

for (const file of files) {
  const content = readFileSync(join(CHANGESET_DIR, file), "utf8");

  // Front matter is delimited by ---
  const parts = content.split("---");
  if (parts.length < 3) {
    console.error(`✗ ${file}: could not parse front matter`);
    failed = true;
    continue;
  }

  const body = parts.slice(2).join("---").trim();
  const firstLine = body.split("\n")[0].trim();

  if (!firstLine) {
    console.error(`✗ ${file}: description is empty`);
    failed = true;
    continue;
  }

  if (CONVENTIONAL_RE.test(firstLine)) {
    console.log(`✓ ${file}: ${firstLine}`);
  } else {
    console.error(`✗ ${file}: "${firstLine}"`);
    console.error(
      `  Must follow conventional commits: type(scope): Description`,
    );
    console.error(
      `  e.g. "feat: Add React preset" or "fix(eslint-config): Correct peer deps"`,
    );
    failed = true;
  }
}

if (failed) process.exit(1);
