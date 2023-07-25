declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly GITHUB_API_TOKEN: string;
		}
	}
}

export {};
