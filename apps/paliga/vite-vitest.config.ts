import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig(() => ({
  test: {
    environment: "jsdom",
    globals: true,
    exclude: [...configDefaults.exclude, "__tests__/browser/*", "tests-examples/*"],
  },
}));
