import { coverageConfigDefaults, defineConfig } from "vitest/config";
export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            include: ["src/**"],
            exclude: ["src/index.ts", "src/v20170710.ts", ...coverageConfigDefaults.exclude],
        },
        include: ["tests/**/*.{test,spec}.ts"],
    },
});
