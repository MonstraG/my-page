import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
// @ts-expect-error There are no types https://github.com/vercel/next.js/issues/71864#issuecomment-2442249579
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
// @ts-expect-error There are no types https://github.com/facebook/react/issues/30119
import hooksPlugin from "eslint-plugin-react-hooks";
import eslintPluginImportX from "eslint-plugin-import-x";
import testingLibrary from "eslint-plugin-testing-library";
import globals from "globals";
// @ts-expect-error There are no types
import pluginCompiler from "eslint-plugin-react-compiler";

/**
 * @type {import("typescript-eslint").InfiniteDepthConfigWithExtends}
 * by https://github.com/vercel/next.js/discussions/49337#discussioncomment-6009130
 */
const flatNextjsConfig = {
	name: "eslint-nextjs (recreated flat)",
	files: ["**/*.ts", "**/*.tsx"],
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

/** @type {import("typescript-eslint").InfiniteDepthConfigWithExtends} */
const testingLibraryConfig = {
	name: "testing-library",
	files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
	...testingLibrary.configs["flat/dom"],
	rules: {
		...testingLibrary.configs["flat/dom"].rules,
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-non-null-assertion": "off"
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
		"no-restricted-imports": [
			"error",
			{
				patterns: [
					{
						group: [".*"],
						message:
							"No relative imports allowed, absolutes play much nicer when moving files"
					},
					{
						group: ["@mui/system"],
						message: "Import from @mui/material instead."
					}
				]
			}
		],
		// I prefer string.match
		"@typescript-eslint/prefer-regexp-exec": "off",

		// nobody actually wants those, and it's always a "forgot an import" type issue
		"no-restricted-globals": ["error", "open", "close"],
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
		]
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
	eslintPluginImportX.flatConfigs.recommended,
	flatNextjsConfig,
	prettierConfig,
	testingLibraryConfig,
	myConfig,
	reactCompilerConfig
]);
