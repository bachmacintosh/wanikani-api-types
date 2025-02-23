import bachmanDev from "@bachman-dev/eslint-config";
import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Replace output folder if needed, e.g. "dist"
    ignores: ["{coverage,docs,dist}/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  bachmanDev({ language: "typescript", namingConvention: "allow-pascal-case-constants" }),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "id-length": ["error", { exceptions: ["v"] }],
    },
  },
  {
    files: ["**/*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    files: ["**/*.js"],
    ...bachmanDev({ language: "javascript-in-typescript" }),
  },
  {
    files: ["tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-confusing-void-expression": ["off"],
      "@typescript-eslint/no-magic-numbers": ["off"],
    },
  },
  eslintConfigPrettier,
);
