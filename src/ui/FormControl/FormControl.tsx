"use client";
import { type ReactElement, useId } from "react";
import styles from "./FormControl.module.css";
import { Input, type InputProps } from "@/ui/Input/Input";
import { useMyFormContext } from "@/components/Form/useMyFormContext";
import { Paragraph } from "@/ui/Paragraph/Paragraph";

export interface FormControlProps<TShape extends object>
	extends Omit<InputProps, "defaultValue" | "name"> {
	name: keyof TShape & string;
	label: string;
}

export const FormControl = <TShape extends object>({
	label,
	startDecorator,
	endDecorator,
	name,
	...rest
}: FormControlProps<TShape>): ReactElement => {
	const myFormContext = useMyFormContext<TShape>();

	const id = useId();

	return (
		<div className={styles.formControl}>
			<label htmlFor={id}>{label}</label>
			<Input
				id={id}
				disabled={myFormContext.isPending}
				name={name}
				defaultValue={myFormContext.state?.defaultValues?.[name]?.toString()}
				{...rest}
			/>
			<Paragraph component="span" color="error">
				{myFormContext.state?.errors?.[name]}
			</Paragraph>
		</div>
	);
};
