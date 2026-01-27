import { createContext, type ReactElement, useContext, useId } from "react";
import { useFormStatus } from "react-dom";
import styles from "./Field.module.css";

export const FieldContext = createContext<{
	id: string | undefined;
	disabled: boolean | undefined;
}>({ id: undefined, disabled: undefined });

export const Field = ({
	label,
	message,
	children,
}: {
	label: string;
	message?: string;
	children: ReactElement;
}) => {
	const id = useId();
	const formStatus = useFormStatus();

	return (
		<FieldContext.Provider value={{ id, disabled: formStatus.pending }}>
			<div>
				<label htmlFor={id} className={styles.label}>
					{label}
				</label>
				{children}
				{message && <p className={styles.label}>{message}</p>}
			</div>
		</FieldContext.Provider>
	);
};

export function useFieldContext({
	id,
	disabled,
}: {
	id: string | undefined;
	disabled: boolean | undefined;
}): {
	id: string | undefined;
	disabled: boolean | undefined;
} {
	const context = useContext(FieldContext);

	return {
		id: id || context.id,
		disabled: disabled || context.disabled,
	};
}
