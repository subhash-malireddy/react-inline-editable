import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
// Configuration for building the demo/docs app
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Base path for GitHub Pages (repo name)
  base: "/react-inline-editable/",
  build: {
    outDir: "dist-docs",
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
