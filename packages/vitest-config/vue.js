import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vitest/config'
import { createBaseConfig } from './index.js'

/**
 * @param {import('vitest/config').UserConfig} [overrides]
 * @returns {import('vitest/config').UserConfig}
 */
export function createVueConfig(overrides) {
  return mergeConfig(
    createBaseConfig({
      plugins: [vue()],
      test: { environment: 'jsdom' },
    }),
    overrides ?? {},
  )
}
