import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: "./lib/index.ts",
      name: "DopuUse",
      formats: ["es", "cjs", "iife"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})
