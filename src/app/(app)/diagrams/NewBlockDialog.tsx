import type { FC, FormEvent } from "react";
import { DialogContent, Modal, ModalClose, ModalDialog, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import type { Block, IO } from "@/app/(app)/diagrams/diagrams.types";
import Button from "@mui/joy/Button";
import { getEmptyIO } from "@/app/(app)/diagrams/diagram.helpers";
import { IOInput } from "@/app/(app)/diagrams/IOInput";

interface Props {
	isOpen: boolean;
	close: () => void;
	addBlock: (block: Block) => void;
}

export const NewBlockDialog: FC<Props> = ({ isOpen, close, addBlock }) => {
	const [input, setInput] = useState<IO>(getEmptyIO());
	const [output, setOutput] = useState<IO>(getEmptyIO());
	useEffect(() => {
		if (isOpen) {
			setOutput(getEmptyIO());
			setInput(getEmptyIO());
		}
	}, [isOpen]);

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();

		if (
			input.amount <= 0 ||
			output.amount <= 0 ||
			!input.resource.trim() ||
			!output.resource.trim()
		) {
			// todo: snackbar "invalid block"
			return;
		}

		addBlock({ input, output });
		close();
	};

	return (
		<Modal
			open={isOpen}
			onClose={() => {
				close();
			}}
		>
			<ModalDialog>
				<ModalClose />
				<Typography>Add new block</Typography>
				<DialogContent>Fill in the inputs and the outputs for the block</DialogContent>
				<form onSubmit={onSubmit}>
					<Stack spacing={2}>
						<IOInput label="Output" io={input} setIo={setInput} />

						<IOInput label="Input" io={output} setIo={setOutput} />

						<Button type="submit">Submit</Button>
					</Stack>
				</form>
			</ModalDialog>
		</Modal>
	);
};
