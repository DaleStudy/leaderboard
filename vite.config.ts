/// <reference types="vitest/config" />
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // React 훅 에러 방지를 위해 React 인스턴스를 한 번만 사용하도록 강제
    dedupe: ["react", "react-dom"],
    alias: {
      react: resolve(__dirname, "node_modules/react"),
      "react-dom": resolve(__dirname, "node_modules/react-dom"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        progress: resolve(__dirname, "progress.html"),
        certificate: resolve(__dirname, "certificate.html"),
      },
    },
  },
  test: {
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      include: ["src/**/*.ts?(x)"],
      exclude: ["src/**/*.stories.ts?(x)"],
      thresholds: {
        lines: 70,
        functions: 70,
        statements: 70,
        branches: 70,
      },
    },
  },
});
