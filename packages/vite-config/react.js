import react from "@vitejs/plugin-react";
import { mergeConfig } from "vite";
import { createBaseConfig } from "./index.js";

/**
 * @param {import('vite').UserConfig} [overrides]
 * @returns {import('vite').UserConfig}
 */
export function createReactConfig(overrides) {
  return mergeConfig(createBaseConfig({ plugins: [react()] }), overrides ?? {});
}
