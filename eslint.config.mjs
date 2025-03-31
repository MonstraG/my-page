import eslint from "@eslint/js";
import typescriptEslint from "typescript-eslint";
// @ts-expect-error There are no types, should be fixed in next big next.js update
import nextPlugin from "@next/eslint-plugin-next";
import eslintPluginImportX from "eslint-plugin-import-x";
import reactPlugin from "eslint-plugin-react";
import pluginCompiler from "eslint-plugin-react-compiler";
import hooksPlugin from "eslint-plugin-react-hooks";

/**
 * @type {import("typescript-eslint").InfiniteDepthConfigWithExtends}
 * by https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
 */
const flatNextjsConfig = {
	name: "eslint-nextjs (recreated flat)",
	plugins: {
		react: reactPlugin,
		"react-hooks": hooksPlugin,
		"@next/next": { rules: nextPlugin.rules },
	},
	rules: {
		...reactPlugin.configs["jsx-runtime"].rules,
		...hooksPlugin.configs.recommended.rules,
		...nextPlugin.configs.recommended.rules,
		...nextPlugin.configs["core-web-vitals"].rules,
		"react-hooks/exhaustive-deps": "error",
	},
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const eslintConfig = {
	name: eslint.meta.name,
	...eslint.configs.recommended,
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const reactCompilerConfig = {
	name: pluginCompiler.meta.name,
	...pluginCompiler.configs.recommended,
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const myConfig = {
	name: "my config",
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
	},
};

export default typescriptEslint.config([
	eslintConfig,
	typescriptEslint.configs.strict,
	typescriptEslint.configs.stylistic,
	eslintPluginImportX.flatConfigs.recommended,
	flatNextjsConfig,
	myConfig,
	reactCompilerConfig,
]);
