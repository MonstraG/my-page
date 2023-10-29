import type { FC, FormEvent } from "react";
import {
	DialogContent,
	Divider,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalClose,
	ModalDialog,
	Stack,
	Typography
} from "@mui/joy";
import { useEffect, useState } from "react";
import type { Block, IO } from "@/app/(app)/diagrams/diagrams.types";
import Button from "@mui/joy/Button";
import { ResourceAutocomplete } from "@/app/(app)/diagrams/ResourceAutocomplete";
import { getEmptyIO } from "@/app/(app)/diagrams/diagram.helpers";

const parseAmount = (amount: string) => {
	const numeric = parseInt(amount);
	if (isNaN(numeric)) return 0;
	return numeric;
};

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
						<FormControl>
							<FormLabel>Amount in</FormLabel>
							<Input
								autoFocus
								required
								value={input.amount}
								onChange={(e) => {
									setInput((prev) => ({
										...prev,
										amount: parseAmount(e.target.value)
									}));
								}}
							/>
						</FormControl>
						<ResourceAutocomplete
							label="Input"
							value={input.resource}
							onChange={(resource: string) => {
								setInput((prev) => ({ ...prev, resource }));
							}}
						/>

						<Divider />

						<FormControl>
							<FormLabel>Amount out</FormLabel>
							<Input
								required
								value={output.amount}
								onChange={(e) => {
									setOutput((prev) => ({
										...prev,
										amount: parseAmount(e.target.value)
									}));
								}}
							/>
						</FormControl>
						<ResourceAutocomplete
							label="Output"
							value={output.resource}
							onChange={(resource: string) => {
								setOutput((prev) => ({ ...prev, resource }));
							}}
						/>

						<Button type="submit">Submit</Button>
					</Stack>
				</form>
			</ModalDialog>
		</Modal>
	);
};
