import type { FCC } from "@/types/react";
import { type ChangeEvent, type ReactElement } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps {
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	type: "checkbox" | "radio";

	value?: string;
	name?: string;
}

export const Checkbox: FCC<CheckboxProps> = ({
	checked,
	value,
	onChange,
	type,
	name,
	children,
}): ReactElement => {
	const inputId = `${name}-${value}`;
	return (
		<div key={inputId} className={styles.field}>
			<input
				className={styles.input}
				type={type}
				id={inputId}
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
			/>
			<label className={styles.label} htmlFor={inputId}>
				{children}
			</label>
		</div>
	);
};
