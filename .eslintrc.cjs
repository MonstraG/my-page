/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"next/core-web-vitals",
		"prettier",
		"plugin:jest/recommended"
	],
	plugins: ["@typescript-eslint", "jest"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname
	},
	root: true,
	rules: {
		"react-hooks/exhaustive-deps": "error",
		"@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
		"@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
		// I want to be explicit
		"@typescript-eslint/no-inferrable-types": "off",
		// ban relatives, absolutes play much nicer when moving files
		"no-restricted-imports": [
			"error",
			{
				patterns: [".*"]
			}
		]
	},
	ignorePatterns: [".eslintrc.cjs", "next.config.mjs"],
	env: {
		"jest/globals": true
	}
};

module.exports = config;
