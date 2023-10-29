export interface IO {
	amount: number;
	resource: string;
}

export interface Block {
	input: IO;
	output: IO;
}
