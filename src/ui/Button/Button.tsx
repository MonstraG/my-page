import { Spinner } from "@/ui/Spinner/Spinner";
import { cn } from "@/functions/cn";
import type { ButtonHTMLAttributes, FC, ReactNode, Ref } from "react";
import styles from "./Button.module.css";
import { useFormStatus } from "react-dom";

function getSpinnerSize(size: "sm" | "md" | "lg") {
	switch (size) {
		case "sm":
			return 2;
		case "md":
			return 3;
		case "lg":
			return 4;
	}
}

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
}) => {
	const formStatus = useFormStatus();

	const resolvedLoading = loading || formStatus.pending;
	const resolvedDisabled = disabled ?? resolvedLoading;

	return (
		<button
			className={cn(
				styles.button,
				startDecorator && styles.hasStartDecorator,
				endDecorator && styles.hasEndDecorator,
				size === "sm" && styles.small,
				size === "lg" && styles.large,
				color === "success" && styles.success,
				color === "error" && styles.error,
				!resolvedDisabled && styles.enabled,
				resolvedLoading && styles.resolvedLoading,
				square && styles.square,
				variant === "plain" && styles.plain,
				active && styles.active,
				className,
			)}
			disabled={resolvedDisabled}
			{...rest}
		>
			{startDecorator && (
				<div className={cn(styles.startDecorator, styles.decorator)}>{startDecorator}</div>
			)}
			<div className={cn(styles.content, alignment === "start" && styles.alignmentStart)}>
				<span>{children}</span>
			</div>
			{loading && <Spinner size={getSpinnerSize(size)} className={styles.spinner} />}
			{endDecorator && (
				<div className={cn(styles.endDecorator, styles.decorator)}>{endDecorator}</div>
			)}
		</button>
	);
};
