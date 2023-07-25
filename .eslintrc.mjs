/** @type {import("@typescript-eslint/utils").TSESLint.Linter.Config} */
const config = {
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
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
		"@typescript-eslint/no-inferrable-types": "off",
		"@typescript-eslint/consistent-type-definitions": "off"
	},
	ignorePatterns: [".eslintrc.mjs", "next.config.mjs"]
};

export default config;
