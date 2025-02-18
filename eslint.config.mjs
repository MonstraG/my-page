import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
// @ts-expect-error There are no types https://github.com/vercel/next.js/issues/71864#issuecomment-2442249579
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
// @ts-expect-error There are no types https://github.com/facebook/react/issues/30119
import hooksPlugin from "eslint-plugin-react-hooks";
import eslintPluginImportX from "eslint-plugin-import-x";
import globals from "globals";
// @ts-expect-error There are no types
import pluginCompiler from "eslint-plugin-react-compiler";

/**
 * @type {import("typescript-eslint").InfiniteDepthConfigWithExtends}
 * by https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
 */
const flatNextjsConfig = {
	name: "eslint-nextjs (recreated flat)",
	plugins: {
		react: reactPlugin,
		"react-hooks": hooksPlugin,
		"@next/next": { rules: nextPlugin.rules }
	},
	rules: {
		...reactPlugin.configs["jsx-runtime"].rules,
		...hooksPlugin.configs.recommended.rules,
		...nextPlugin.configs.recommended.rules,
		...nextPlugin.configs["core-web-vitals"].rules,
		"react-hooks/exhaustive-deps": "error"
	}
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const prettierConfig = {
	name: "prettier-config",
	...eslintConfigPrettier
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const eslintConfig = {
	name: "eslint-config",
	...eslint.configs.recommended
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const reactCompilerConfig = {
	name: "react-compiler/recommended",
	plugins: {
		"react-compiler": pluginCompiler
	},
	rules: {
		"react-compiler/react-compiler": "error"
	}
};

/** @type {import("typescript-eslint").ConfigWithExtends} */
const myConfig = {
	name: "my config",
	files: ["**/*.{mjs,ts,tsx}"],
	rules: {
		"no-console": ["error", { allow: ["debug", "warn", "error"] }],
		"@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
		"@typescript-eslint/no-non-null-assertion": "off",
		// I want to be explicit
		"@typescript-eslint/no-inferrable-types": "off",
		// I prefer string.match
		"@typescript-eslint/prefer-regexp-exec": "off",
		// nobody actually wants those, and it's always a "forgot an import" type issue
		"no-restricted-globals": ["error", "open", "close", "event"],
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{ fixStyle: "inline-type-imports" }
		],
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				ignoreRestSiblings: true,
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_"
			}
		],
		"no-extra-boolean-cast": "off", // explicit > implicit
		"@typescript-eslint/no-empty-object-type": [
			"error",
			{ allowInterfaces: "with-single-extends" }
		], // that's how you do `no-empty-interface` but in types (useful in theme overrides)
		"import-x/no-cycle": "error",
		"import-x/no-unresolved": "off", // doesn't work in this very file
		"@typescript-eslint/no-unnecessary-condition": "off",
		"@typescript-eslint/prefer-nullish-coalescing": "off",
		"@typescript-eslint/no-invalid-void-type": "off",
		"@typescript-eslint/unified-signatures": [
			"error",
			{ ignoreDifferentlyNamedParameters: true }
		],

		"@typescript-eslint/explicit-module-boundary-types": "error",

		// recommendations to disable rules by typescript-eslint
		// https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
		"import-x/named": "off",
		"import/namespace": "off",
		"import/default": "off",
		"import/no-named-as-default-member": "off",
		"import/no-unresolved": "off"
	},
	languageOptions: {
		globals: {
			...globals.browser,
			...globals.node
		}
	}
};

export default tseslint.config([
	eslintConfig,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	eslintPluginImportX.flatConfigs.errors,
	eslintPluginImportX.flatConfigs.recommended,
	flatNextjsConfig,
	prettierConfig,
	myConfig,
	reactCompilerConfig
]);
