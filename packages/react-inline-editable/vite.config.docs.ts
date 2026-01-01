import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// Configuration for building the demo/docs app
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist-docs",
    sourcemap: true,
  },
});
