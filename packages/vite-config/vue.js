import vue from "@vitejs/plugin-vue";
import { mergeConfig } from "vite";
import { createBaseConfig } from "./index.js";

/**
 * @param {import('vite').UserConfig} [overrides]
 * @returns {import('vite').UserConfig}
 */
export function createVueConfig(overrides) {
  return mergeConfig(createBaseConfig({ plugins: [vue()] }), overrides ?? {});
}
