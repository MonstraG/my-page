import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import { ResourceAutocomplete } from "@/app/(app)/diagrams/ResourceAutocomplete";
import type { IO } from "@/app/(app)/diagrams/diagrams.types";

const parseAmount = (amount: string) => {
	const numeric = parseInt(amount);
	if (isNaN(numeric)) return 0;
	return numeric;
};

interface Props {
	io: IO;
	setIo: Dispatch<SetStateAction<IO>>;
	label: string;
	disabled?: boolean;
}

export const IOInput: FC<Props> = ({ io, setIo, label, disabled }) => {
	const onAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIo((prev) => ({
			...prev,
			amount: parseAmount(e.target.value)
		}));
	};

	const onResourceChange = (resource: string) => {
		setIo((prev) => ({ ...prev, resource }));
	};

	return (
		<FormControl disabled={Boolean(disabled)}>
			<FormLabel>{label}</FormLabel>
			<Stack direction="row" spacing={2}>
				<Input
					autoFocus
					required
					value={io.amount}
					onChange={onAmountChange}
					sx={{ width: "100px" }}
					disabled={disabled}
				/>
				<ResourceAutocomplete
					value={io.resource}
					onChange={onResourceChange}
					disabled={disabled}
				/>
			</Stack>
		</FormControl>
	);
};
