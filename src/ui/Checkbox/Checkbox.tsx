import type { FCC } from "@/types/react";
import { type ChangeEvent, type ReactElement, useCallback } from "react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps {
	checked: boolean;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	type: "checkbox" | "radio";
	indeterminate?: boolean;
	value?: string;
	name: string;
}

export const Checkbox: FCC<CheckboxProps> = ({
	indeterminate,
	checked,
	value,
	onChange,
	type,
	name,
	children,
}): ReactElement => {
	const inputId = `${name}-${value}`;

	/**
	 *  there is no prop; this is the only way to do it
	 * 	https://github.com/facebook/react/issues/1798#issuecomment-417047897
	 */
	const setIndeterminateRef = useCallback((checkbox: HTMLInputElement) => {
		if (checkbox) {
			checkbox.indeterminate = Boolean(indeterminate);
		}
	}, [indeterminate]);

	return (
		<div key={inputId} className={styles.field}>
			<input
				ref={setIndeterminateRef}
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
