import swc from "@rollup/plugin-swc";
import { resolve } from "path";
import { defineConfig } from "vite";
import prism from "vite-plugin-prismjs";
import { defaultConfig } from "./vite-default.config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  ...defaultConfig,
  ...(mode === "docs" && {
    root: resolve(__dirname, "src/apps/docs"),
    build: {
      sourcemap: true,
      root: resolve(__dirname, "src/apps/docs"),
      outDir: resolve(__dirname, "dist-docs"),
      rollupOptions: {
        output: {
          interop: "auto",
        },
        plugins: [
          swc({
            swc: {
              sourceMaps: true,
            },
          }),
        ],
      },
    },
    plugins: [
      ...(defaultConfig.plugins ?? []),
      prism({
        languages: ["javascript", "typescript", "tsx", "html", "css"],
        plugins: ["line-numbers"],
        theme: "tomorrow",
        css: true,
      }),
    ],
  }),
}));
