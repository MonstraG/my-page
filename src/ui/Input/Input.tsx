import { cn } from "@/functions/cn";
import type { FC, InputHTMLAttributes, ReactNode, RefObject } from "react";
import styles from "./Input.module.css";
import { useFieldContext } from "@/ui/Field/Field.tsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	ref?: RefObject<HTMLInputElement | null>;
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	invalid?: boolean;
}

export const Input: FC<InputProps> = ({
	startDecorator,
	endDecorator,
	className,
	style,
	invalid,
	...rest
}) => {
	const { id, disabled } = useFieldContext({ id: rest.id, disabled: rest.disabled });

	return (
		<div className={cn(styles.formControl, invalid && styles.invalid, className)} style={style}>
			{startDecorator && <div className={styles.decorator}>{startDecorator}</div>}
			<input
				{...rest}
				id={id}
				disabled={disabled}
				className={cn(
					styles.input,
					startDecorator && styles.hasStartDecorator,
					endDecorator && styles.hasEndDecorator,
				)}
			/>
			{endDecorator && <div className={styles.decorator}>{endDecorator}</div>}
		</div>
	);
};
