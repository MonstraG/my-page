import type { FC, FormEvent } from "react";
import DialogContent from "@mui/joy/DialogContent";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { useEffect, useState } from "react";
import type { IO } from "@/app/(app)/diagrams/diagrams.types";
import { getEmptyIO } from "@/app/(app)/diagrams/diagram.helpers";
import { IOInput } from "@/app/(app)/diagrams/IOInput";
import { Block } from "@/app/(app)/diagrams/Block";
import { SwitchControl } from "@/app/(app)/diagrams/Switch";
import { openSnackbar } from "@/components/SnackbarHost";

interface Props {
	isOpen: boolean;
	close: () => void;
	addBlock: (block: Block) => void;
}

export const NewBlockDialog: FC<Props> = ({ isOpen, close, addBlock }) => {
	const [input, setInput] = useState<IO>(getEmptyIO());
	const [output, setOutput] = useState<IO>(getEmptyIO());
	const [inputless, setInputless] = useState<boolean>(false);
	useEffect(() => {
		if (isOpen) {
			setInput(getEmptyIO());
			setOutput(getEmptyIO());
		}
	}, [isOpen]);

	const handleInputlessChange = (newInputless: boolean) => {
		setInputless(newInputless);
		setInput(getEmptyIO());
	};

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();

		const inputEmpty = input.amount <= 0 || !input.resource.trim();
		if (!inputless && inputEmpty) {
			openSnackbar({ color: "warning", variant: "solid", children: "Input is empty" });
			return;
		}
		const outputEmpty = output.amount <= 0 || !output.resource.trim();
		if (outputEmpty) {
			openSnackbar({ color: "warning", variant: "solid", children: "Output is empty" });
			return;
		}

		addBlock(new Block([input], [output]));
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
						<SwitchControl
							label="Block has no input"
							helperText="Only inputless blocks can be used in factory input"
							checked={inputless}
							setChecked={handleInputlessChange}
						/>

						<IOInput label="Input" io={input} setIo={setInput} disabled={inputless} />

						<IOInput label="Output" io={output} setIo={setOutput} />

						<Button type="submit">Submit</Button>
					</Stack>
				</form>
			</ModalDialog>
		</Modal>
	);
};
