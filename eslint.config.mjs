import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// @ts-expect-error There are no types https://github.com/vercel/next.js/issues/71864#issuecomment-2442249579
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
	// todo: can be replaced with this, but only after https://github.com/facebook/react/issues/32575 is resolved
	// ...pluginCompiler.configs.recommended,
	plugins: {
		"react-compiler": pluginCompiler,
	},
	rules: {
		"react-compiler/react-compiler": "error",
	},
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const myConfig = {
	name: "my config",
	files: ["**/*.{mjs,ts,tsx}"],
	rules: {
		"no-console": ["error", { allow: ["debug", "warn", "error"] }],

		// nobody actually wants those, and it's always a "forgot an import" type issue
		"no-restricted-globals": ["error", "open", "close", "event"],

		"@typescript-eslint/consistent-type-imports": [
			"error",
			{ fixStyle: "inline-type-imports" },
		],
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

		"@typescript-eslint/no-empty-object-type": [
			"error",
			{ allowInterfaces: "with-single-extends" },
		],

		"import-x/no-cycle": "error",
		"@typescript-eslint/no-invalid-void-type": "off",
		"@typescript-eslint/unified-signatures": [
			"error",
			{ ignoreDifferentlyNamedParameters: true },
		],

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

export default tseslint.config([
	eslintConfig,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	eslintPluginImportX.flatConfigs.recommended,
	flatNextjsConfig,
	myConfig,
	reactCompilerConfig,
]);
