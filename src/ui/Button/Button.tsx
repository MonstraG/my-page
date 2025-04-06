import { Spinner } from "@/ui/Spinner/Spinner";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes, FC, ReactNode, Ref } from "react";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	size?: "sm" | "md" | "lg" | undefined;
	color?: "neutral" | "success" | "error";
	loading?: boolean;
	square?: boolean;
	variant?: "outlined" | "plain";
	ref?: Ref<HTMLButtonElement>;
	active?: boolean;
	alignment?: "start" | "center";
}

export const Button: FC<ButtonProps> = ({
	startDecorator,
	endDecorator,
	className,
	children,
	size = "md",
	color = "neutral",
	loading,
	disabled,
	square,
	variant = "outlined",
	active,
	alignment,
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
			variant === "plain" && styles.plain,
			active && styles.active,
			className,
		)}
		disabled={disabled || loading}
		{...rest}
	>
		{startDecorator && (
			<div className={clsx(styles.startDecorator, styles.decorator)}>
				{startDecorator}
			</div>
		)}
		<div className={clsx(styles.content, alignment === "start" && styles.alignmentStart)}>
			<span>{children}</span>
		</div>
		<Spinner size={size == "lg" ? 4 : size == "sm" ? 2 : 3} className={styles.spinner} />
		{endDecorator && (
			<div className={clsx(styles.endDecorator, styles.decorator)}>{endDecorator}</div>
		)}
	</button>
);
