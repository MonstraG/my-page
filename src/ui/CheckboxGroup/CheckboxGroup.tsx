import { Checkbox, type CheckboxProps } from "@/ui/Checkbox/Checkbox";
import { type ChangeEvent, type ReactElement, useCallback, useId } from "react";
import styles from "./CheckboxGroup.module.css";

export interface CheckboxOption {
	value: string;
	name: string;
}

interface Props<T extends CheckboxOption> {
	label: string;
	options: readonly T[];
	selected: T["value"] | null | undefined;
	setSelected: (newValue: T["value"]) => void;
	type: CheckboxProps["type"];
}

export const CheckboxGroup = <T extends CheckboxOption>({
	label,
	options,
	selected,
	setSelected,
	type,
}: Props<T>): ReactElement => {
	const id = useId();

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (event.target.checked) {
				setSelected(event.target.value);
			}
		},
		[setSelected],
	);

	return (
		<fieldset className={styles.fieldset}>
			<legend className={styles.legend}>{label}</legend>
			{options.map((option) => (
				<Checkbox
					key={option.value}
					type={type}
					name={id}
					value={option.value}
					checked={selected === option.value}
					onChange={handleChange}
				>
					{option.name}
				</Checkbox>
			))}
		</fieldset>
	);
};
