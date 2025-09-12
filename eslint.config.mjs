import eslint from "@eslint/js";
import next from "@next/eslint-plugin-next";
import { importX } from "eslint-plugin-import-x";
import jsxAlly from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";

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
const myConfig = {
	name: "my-eslint-config",
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

		// react compiler support
		"react-hooks/react-compiler": "error",

		// allow numbers
		"@typescript-eslint/restrict-template-expressions": [
			"error",
			{ allowNumber: true },
		],
	},
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const enableTypingInfo = {
	name: "enable-typing-info",
	languageOptions: {
		parserOptions: {
			projectService: true,
			tsconfigRootDir: import.meta.dirname,
		},
	},
};

export default defineConfig([
	eslintConfig,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	enableTypingInfo,
	reactConfig,
	reactHooks.configs.recommended,
	jsxAlly.flatConfigs.recommended,
	// @ts-expect-error types are wrong https://github.com/vercel/next.js/issues/82967
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- types are wrong
	next.flatConfig.coreWebVitals,
	importX.flatConfigs.recommended,
	myConfig,
	globalIgnores([".next/*", "node_modules/*", "./next-env.d.ts"]),
]);
