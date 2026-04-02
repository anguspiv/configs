import react from '@vitejs/plugin-react'
import { mergeConfig } from 'vitest/config'
import { createBaseConfig } from './index.js'

/**
 * @param {import('vitest/config').UserConfig} [overrides]
 * @returns {import('vitest/config').UserConfig}
 */
export function createReactConfig(overrides) {
  return mergeConfig(
    createBaseConfig({
      plugins: [react()],
      test: { environment: 'jsdom' },
    }),
    overrides ?? {},
  )
}
