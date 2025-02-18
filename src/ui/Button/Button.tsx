import styles from "./Button.module.css";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { clsx } from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	size?: "sm" | "md";
}

export const Button: FC<Props> = ({
	startDecorator,
	endDecorator,
	className,
	children,
	size = "md",
	...rest
}) => (
	<button
		className={clsx(
			styles.button,
			startDecorator && styles.hasStartDecorator,
			endDecorator && styles.hasEndDecorator,
			size === "sm" && styles.small,
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
	</button>
);
