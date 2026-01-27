import { cn } from "@/functions/cn";
import type { FC, InputHTMLAttributes, ReactNode, RefObject } from "react";
import styles from "./Input.module.css";

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
}) => (
	<div className={cn(styles.formControl, invalid && styles.invalid, className)} style={style}>
		{startDecorator && <div className={styles.decorator}>{startDecorator}</div>}
		<input
			className={cn(
				styles.input,
				startDecorator && styles.hasStartDecorator,
				endDecorator && styles.hasEndDecorator,
			)}
			{...rest}
		/>
		{endDecorator && <div className={styles.decorator}>{endDecorator}</div>}
	</div>
);
