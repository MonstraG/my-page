import { type ChangeEvent, type ReactElement, useCallback, useId } from "react";
import styles from "./RadioGroup.module.css";

export interface RadioOption {
	value: string;
	name: string;
}

interface Props<T extends RadioOption> {
	label: string;
	options: readonly T[];
	selected: T["value"] | null | undefined;
	setSelected: (newValue: T["value"]) => void;
}

export const RadioGroup = <T extends RadioOption>({
	label,
	options,
	selected,
	setSelected
}: Props<T>): ReactElement => {
	const id = useId();

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (event.target.checked) {
				setSelected(event.target.value);
			}
		},
		[setSelected]
	);

	return (
		<fieldset className={styles.fieldset}>
			<legend className={styles.legend}>{label}</legend>
			{options.map((option) => {
				const inputId = `${id}-${option.value}`;
				return (
					<div key={inputId} className={styles.field}>
						<input
							className={styles.input}
							type="radio"
							id={inputId}
							name={id}
							value={option.value}
							checked={selected === option.value}
							onChange={handleChange}
						/>
						<label className={styles.label} htmlFor={inputId}>
							{option.name}
						</label>
					</div>
				);
			})}
		</fieldset>
	);
};
