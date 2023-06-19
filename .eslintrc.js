/** @type import("@typescript-eslint/utils").TSESLint.Linter.Config */
const config = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "prettier"
  ],
  rules: {
    "react-hooks/exhaustive-deps": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "@typescript-eslint/no-empty-interface": ["error", { allowSingleExtends: true }],
    "@typescript-eslint/no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "@typescript-eslint/no-inferrable-types": "off"
  }
};

module.exports = config;
