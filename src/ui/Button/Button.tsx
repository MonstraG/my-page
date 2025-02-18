import styles from "./Button.module.css";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { clsx } from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	size?: "sm" | "md" | "lg";
	color?: "neutral" | "success" | "error";
	// todo:
	loading?: boolean;
}

export const Button: FC<Props> = ({
	startDecorator,
	endDecorator,
	className,
	children,
	size = "md",
	color = "neutral",
	...rest
}) => (
	<button
		className={clsx(
			styles.button,
			startDecorator && styles.hasStartDecorator,
			endDecorator && styles.hasEndDecorator,
			size === "sm" && styles.small,
			size === "lg" && styles.large,
			color === "success" && styles.success,
			color === "error" && styles.error,
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
