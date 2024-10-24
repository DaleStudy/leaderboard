/// <reference types="vitest" />

import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      include: ["src/**/*.ts?(x)"],
      thresholds: {
        lines: 10,
        functions: 20,
        statements: 10,
        branches: 30,
      },
    },
  },
});
