import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";
// @ts-expect-error There are no types
import next from "@next/eslint-plugin-next";
import importX from "eslint-plugin-import-x";
import jsxAlly from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import("typescript-eslint").ConfigWithExtends} */
const eslintConfig = {
	name: eslint.meta.name,
	...eslint.configs.recommended,
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const reactConfig = {
	name: "eslint-plugin-react",
	...react.configs.flat["jsx-runtime"],
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const reactCompilerConfig = {
	name: reactCompiler.meta.name,
	...reactCompiler.configs.recommended,
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const myConfig = {
	name: "my-eslint-config",
	files: ["**/*.{mjs,ts,tsx}"],
	rules: {
		// avoid shipping a bunch of console.logs leftover accidentally, use other type to indicate it's important to keep
		"no-console": ["error", { allow: ["debug", "warn", "error"] }],

		// nobody actually wants those, and it's always a "forgot an import" type issue
		"no-restricted-globals": ["error", "open", "close", "event"],

		// require types to always be present
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{ fixStyle: "inline-type-imports" },
		],

		// allow unused vars for ignore or rest (that basically the only-non destructive way to remove a prop)
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				ignoreRestSiblings: true,
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			},
		],

		// explicit > implicit
		"no-extra-boolean-cast": "off",

		// sometimes we alias
		"@typescript-eslint/no-empty-object-type": [
			"error",
			{ allowInterfaces: "with-single-extends" },
		],

		// improve type-check performance
		"import-x/no-cycle": "error",
		"@typescript-eslint/explicit-module-boundary-types": "error",

		// recommendations to disable rules by typescript-eslint
		// https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
		"import-x/named": "off",
		"import-x/namespace": "off",
		"import-x/default": "off",
		"import-x/no-named-as-default-member": "off",
		"import-x/no-unresolved": "off",

		// my video elements are for video chat, those don't have captions
		"jsx-a11y/media-has-caption": "off",

		// raise to error
		"react-hooks/exhaustive-deps": "error",
	},
};

export default typescriptEslint.config([
	eslintConfig,
	typescriptEslint.configs.strict,
	typescriptEslint.configs.stylistic,
	reactConfig,
	reactCompilerConfig,
	reactHooks.configs["recommended-latest"],
	jsxAlly.flatConfigs.recommended,
	next.flatConfig.coreWebVitals,
	importX.flatConfigs.recommended,
	myConfig,
]);
