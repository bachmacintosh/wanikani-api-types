/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	transform: {
		"^.+\\.[tj]sx?$": [
			"ts-jest",
			{
				useESM: true,
			},
		],
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
};
