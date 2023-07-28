declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly ANALYZE: "true" | "false";
			readonly GITHUB_API_TOKEN: string;
		}
	}
}

export {};
