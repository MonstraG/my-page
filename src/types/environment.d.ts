declare global {
	namespace NodeJS {
		interface ProcessEnv {
			readonly ANALYZE: "true" | "false";
			readonly GITHUB_API_TOKEN: string;

			readonly KSESHA_TEL_NICE: string;
			readonly KSESHA_TEL: string;
			readonly KSESHA_MAIL: string;

			readonly ME_MAIL: string;

			readonly VERCEL_GIT_COMMIT_SHA: string | undefined;
		}
	}
}

export {};
