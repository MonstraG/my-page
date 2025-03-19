import { clsx } from "clsx";
import type { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./ButtonList.module.css";

interface ButtonListProps extends HTMLAttributes<HTMLUListElement> {}

export const ButtonList: FC<ButtonListProps> = ({ className, ...props }) => (
	<ul className={clsx(styles.buttonList, className)} {...props} />
);

interface ButtonListButton extends HTMLAttributes<HTMLDivElement> {
	endDecorator: ReactNode;
}

export const ButtonListButton: FC<ButtonListButton> = ({ className, endDecorator, ...rest }) => (
	<li>
		<div
			role="button"
			tabIndex={0}
			className={clsx(styles.buttonListButton, className)}
			{...rest}
		/>
		{endDecorator && <div className={styles.endDecorator}>{endDecorator}</div>}
	</li>
);
