import { UnfoldMoreIcon } from "@/icons/material/UnfoldMoreIcon";
import { Button, type ButtonProps } from "@/ui/Button/Button";
import { Sheet } from "@/ui/Sheet/Sheet";
import { cn } from "@/functions/cn";
import { type FC, type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import styles from "./Select.module.css";
import { useFieldContext } from "@/ui/Field/Field.tsx";

export interface SelectProps
	extends Omit<
		ButtonProps,
		"type" | "role" | "value" | "aria-controls" | "aria-haspopup" | "tabIndex" | "aria-expanded"
	> {
	placeholder: string;
}

/**
 * https://www.freecodecamp.org/news/how-to-build-an-accessible-custom-dropdown-select-element/
 */
export const Select: FC<SelectProps> = ({ children, className, placeholder, ...rest }) => {
	const localId = useId();
	const [expanded, setExpanded] = useState<boolean>(false);

	const { id, disabled } = useFieldContext({ id: localId ?? rest.id, disabled: rest.disabled });

	const buttonRef = useRef<HTMLButtonElement>(null);
	const listboxRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!buttonRef.current || !listboxRef.current) {
			return;
		}

		const abortController = new AbortController();

		document.addEventListener(
			"click",
			function handleOutsideClick(event) {
				if (!listboxRef.current || !buttonRef.current || !event.target) {
					return;
				}
				if (!(event.target instanceof Element)) {
					return;
				}
				const clickOutside =
					!buttonRef.current.contains(event.target) &&
					!listboxRef.current.contains(event.target);
				if (clickOutside) {
					setExpanded(false);
				}
			},
			{
				signal: abortController.signal,
			},
		);
		return () => {
			abortController.abort();
		};
	}, []);

	const listboxId = `${id}-listbox`;
	return (
		<div className={cn(styles.control)}>
			<Button
				type="button"
				role="combobox"
				value="Select"
				aria-controls={listboxId}
				aria-haspopup="listbox"
				tabIndex={0}
				aria-expanded={expanded}
				className={cn(styles.select, className)}
				endDecorator={<UnfoldMoreIcon />}
				ref={buttonRef}
				onClick={() => setExpanded(true)}
				onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) => {
					if (event.key === "Enter" || event.key === " ") {
						setExpanded(true);
						return;
					}
					if (event.key === "Escape") {
						setExpanded(false);
					}
				}}
				alignment="start"
				{...rest}
				disabled={disabled}
				id={id}
			>
				{placeholder}
			</Button>
			<div
				role="listbox"
				ref={listboxRef}
				id={listboxId}
				className={cn(styles.listbox, expanded && styles.expanded)}
			>
				<Sheet className={styles.listboxSheet} onClick={() => setExpanded(false)}>
					{children}
				</Sheet>
			</div>
		</div>
	);
};
