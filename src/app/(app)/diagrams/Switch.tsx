import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Switch from "@mui/joy/Switch";
import type { FC } from "react";

interface Props {
	label: string;
	helperText?: string;
	checked: boolean;
	setChecked: (newChecked: boolean) => void;
}

export const SwitchControl: FC<Props> = ({ label, helperText, checked, setChecked }) => (
	<FormControl orientation="horizontal" sx={{ gap: 1 }}>
		<div>
			<FormLabel>{label}</FormLabel>
			<FormHelperText sx={{ mt: 0 }}>{helperText}</FormHelperText>
		</div>
		<Switch
			checked={checked}
			onChange={(event) => {
				setChecked(event.target.checked);
			}}
			color={checked ? "primary" : "neutral"}
			variant={checked ? "solid" : "outlined"}
		/>
	</FormControl>
);
