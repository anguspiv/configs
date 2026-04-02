import { defineConfig, mergeConfig } from 'vitest/config'

/**
 * @param {import('vitest/config').UserConfig} [overrides]
 * @returns {import('vitest/config').UserConfig}
 */
export function createBaseConfig(overrides) {
  return mergeConfig(
    defineConfig({
      test: {
        globals: true,
        environment: 'node',
        coverage: {
          provider: 'v8',
          reporter: ['text', 'lcov'],
          exclude: ['node_modules/', 'dist/'],
        },
      },
    }),
    overrides ?? {},
  )
}
