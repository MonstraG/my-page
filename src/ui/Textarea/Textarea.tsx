import { cn } from "@/functions/cn";
import type { FC, RefObject, TextareaHTMLAttributes } from "react";
import styles from "@/ui/Textarea/Textarea.module.css";
import { useFieldContext } from "@/ui/Field/Field.tsx";

export interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	ref?: RefObject<HTMLTextAreaElement | null>;
	invalid?: boolean;
}

export const Textarea: FC<InputProps> = ({ className, style, invalid, ...rest }) => {
	const { id, disabled } = useFieldContext({ id: rest.id, disabled: rest.disabled });

	return (
		<textarea
			{...rest}
			id={id}
			disabled={disabled}
			className={cn(styles.textarea, invalid && styles.invalid, className)}
		/>
	);
};
