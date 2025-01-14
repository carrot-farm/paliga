import { defineConfig } from "vite";
import { defaultConfig } from "./vite-default.config";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  ...defaultConfig,
}));
