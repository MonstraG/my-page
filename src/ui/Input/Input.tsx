import { clsx } from "clsx";
import type { FC, InputHTMLAttributes, ReactNode, RefObject } from "react";
import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	ref?: RefObject<HTMLInputElement | null>;
	startDecorator?: ReactNode;
	endDecorator?: ReactNode;
	invalid?: boolean;
}

export const Input: FC<Props> = (
	{ startDecorator, endDecorator, className, style, invalid, ...rest },
) => (
	<div className={clsx(styles.formControl, invalid && styles.invalid, className)} style={style}>
		{startDecorator && <div className={styles.decorator}>{startDecorator}</div>}
		<input className={styles.input} {...rest} />
		{endDecorator && <div className={styles.decorator}>{endDecorator}</div>}
	</div>
);
