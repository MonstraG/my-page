import { cn } from "@/functions/cn";
import type { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./ButtonList.module.css";

interface ButtonListProps extends HTMLAttributes<HTMLUListElement> {}

export const ButtonList: FC<ButtonListProps> = ({ className, ...props }) => (
	<ul className={cn(styles.buttonList, className)} {...props} />
);

interface ButtonListButton extends HTMLAttributes<HTMLButtonElement> {
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
}

export const ButtonListButton: FC<ButtonListButton> = ({
	className,
	startDecorator,
	endDecorator,
	...rest
}) => (
	<li>
		{startDecorator && <div className={styles.startDecorator}>{startDecorator}</div>}
		<button tabIndex={0} className={cn(styles.buttonListButton, className)} {...rest} />
		{endDecorator && <div className={styles.endDecorator}>{endDecorator}</div>}
	</li>
);
