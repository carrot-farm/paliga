import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import prism from "vite-plugin-prismjs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    prism({
      languages: ["javascript", "typescript", "tsx", "html", "css"],
      plugins: ["line-numbers"],
      theme: "tomorrow",
      css: true,
    }),
  ],
});
