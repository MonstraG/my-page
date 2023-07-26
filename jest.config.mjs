import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./"
});

/** @type {import('jest').Config} */
const config = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.mjs"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	testEnvironment: "jest-environment-jsdom"
};

export default createJestConfig(config);
