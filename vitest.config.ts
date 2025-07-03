import vitePluginReact from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [tsconfigPaths(), vitePluginReact()],
	test: {
		environment: "jsdom",
	},
});
