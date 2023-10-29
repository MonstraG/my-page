export interface IO {
	amount: number;
	resource: string;
}

// todo: blocks can have multiple IO's or 0 (miners)
export interface Block {
	input: IO;
	output: IO;
}

export interface Factory {
	input: IO;
	layers: Layer[];
}

export interface Layer {
	block: Block | null;
	amount: number;

	// todo: split layer into 2
	// todo: together with
	// `nextLayer: Layer[]`
}
