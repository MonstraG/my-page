import styles from "./Button.module.css";
import type { FC, InputHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
}

export const Button: FC<Props> = ({
	startDecorator,
	endDecorator,
	className,
	children,
	...rest
}) => (
	<div
		className={clsx(
			styles.button,
			startDecorator && styles.hasStartDecorator,
			endDecorator && styles.hasEndDecorator,
			className
		)}
		{...rest}
	>
		{startDecorator && (
			<div className={clsx(styles.startDecorator, styles.decorator)}>{startDecorator}</div>
		)}
		<span>{children}</span>
		{endDecorator && (
			<div className={clsx(styles.endDecorator, styles.decorator)}>{endDecorator}</div>
		)}
	</div>
);
