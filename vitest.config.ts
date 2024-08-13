import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
    },
    include: ["tests/**/*.{test,spec}.ts"],
  },
});
