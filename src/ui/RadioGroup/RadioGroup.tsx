import { type ChangeEvent, type ReactElement, useCallback, useId } from "react";

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
		<fieldset>
			<legend>{label}</legend>
			{options.map((option) => {
				const inputId = `${id}-${option.value}`;
				return (
					<div key={inputId}>
						<input
							type="radio"
							id={inputId}
							name={id}
							value={option.value}
							checked={selected === option.value}
							onChange={handleChange}
						/>
						<label htmlFor={inputId}>{option.name}</label>
					</div>
				);
			})}
		</fieldset>
	);
};
