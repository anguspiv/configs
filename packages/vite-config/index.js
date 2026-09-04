import { defineConfig, mergeConfig } from "vite";

/**
 * @param {import('vite').UserConfig} [overrides]
 * @returns {import('vite').UserConfig}
 */
export function createBaseConfig(overrides) {
  return mergeConfig(
    defineConfig({
      build: {
        target: "esnext",
      },
    }),
    overrides ?? {},
  );
}
