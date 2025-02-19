import styles from "./Button.module.css";
import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { clsx } from "clsx";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	size?: "sm" | "md" | "lg";
	color?: "neutral" | "success" | "error";
	loading?: boolean;
	square?: boolean;
}

export const Button: FC<Props> = ({
	startDecorator,
	endDecorator,
	className,
	children,
	size = "md",
	color = "neutral",
	loading,
	disabled,
	square,
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
			!Boolean(disabled || loading) && styles.enabled,
			loading && styles.loading,
			square && styles.square,
			className
		)}
		disabled={disabled || loading}
		{...rest}
	>
		{startDecorator && (
			<div className={clsx(styles.startDecorator, styles.decorator)}>{startDecorator}</div>
		)}
		<span>{children}</span>
		<progress />
		{endDecorator && (
			<div className={clsx(styles.endDecorator, styles.decorator)}>{endDecorator}</div>
		)}
	</button>
);
