module.exports = {
	printWidth: 120,
	semi: true,
	singleAttributePerLine: true,
	singleQuote: false,
	trailingComma: "all",
	useTabs: true,
	overrides: [
		{
			files: "*.md",
			options: {
				useTabs: false,
			},
		},
	],
};
