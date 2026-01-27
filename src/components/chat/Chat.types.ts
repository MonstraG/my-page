export type ChatConnection =
	| {
			ok: true;
			models: string[];
			url: URL;
	  }
	| {
			ok: false;
			models: [];
			url: undefined;
	  };

export interface ChatMessage {
	role: "user" | "assistant" | "system";
	content: string;
}
