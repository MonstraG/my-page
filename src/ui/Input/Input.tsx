import { clsx } from "clsx";
import type { FC, InputHTMLAttributes, ReactNode } from "react";
import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
}

export const Input: FC<Props> = ({ startDecorator, endDecorator, className, ...rest }) => (
	<div className={clsx(styles.formControl, className)}>
		{startDecorator && <div className={styles.decorator}>{startDecorator}</div>}
		<input className={styles.input} {...rest} />
		{endDecorator && <div className={styles.decorator}>{endDecorator}</div>}
	</div>
);
