import nextJest from "next/jest";

const createJestConfig = nextJest({
	dir: "./"
});

/** @type {import('jest').Config} */
const config = {
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	testEnvironment: "jest-environment-jsdom"
};

export default createJestConfig(config);
