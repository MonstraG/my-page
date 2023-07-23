/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict",
		"plugin:@typescript-eslint/stylistic",
		"next/core-web-vitals",
		"prettier"
	],
	plugins: ["@typescript-eslint"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
		tsconfigRootDir: __dirname
	},
	root: true,
	rules: {
		"react-hooks/exhaustive-deps": "error",
		"no-console": ["error", { allow: ["warn", "error"] }],
		"@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
		"@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
		"@typescript-eslint/no-inferrable-types": "off"
	},
	ignorePatterns: [".eslintrc.js", "next.config.js"]
};

module.exports = config;
