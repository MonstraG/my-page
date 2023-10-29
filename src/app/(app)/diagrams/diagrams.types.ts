export interface IO {
	amount: number;
	resource: string;
}

export interface Block {
	input: IO;
	output: IO;
}

export interface Factory {
	input: IO;
	layers: Layer[];
	output: IO;
}

export interface Layer {
	blocks: [];
}
