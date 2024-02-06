module.exports = {
  printWidth: 120,
  semi: true,
  singleAttributePerLine: true,
  singleQuote: false,
  trailingComma: "all",
  overrides: [
    {
      files: ["tsconfig.json", "jsconfig.json"],
      options: {
        parser: "jsonc",
      },
    },
  ],
};
