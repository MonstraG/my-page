import { UnfoldMoreIcon } from "@/icons/material/UnfoldMoreIcon";
import { Button, type ButtonProps } from "@/ui/Button/Button";
import { Sheet } from "@/ui/Sheet/Sheet";
import { cn } from "@/functions/cn";
import { type FC, type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import styles from "./Select.module.css";

interface Props
	extends Omit<
		ButtonProps,
		| "type"
		| "role"
		| "id"
		| "value"
		| "aria-controls"
		| "aria-haspopup"
		| "tabIndex"
		| "aria-expanded"
	> {
	label: string;
}

// https://www.freecodecamp.org/news/how-to-build-an-accessible-custom-dropdown-select-element/
export const Select: FC<Props> = ({ children, className, label, ...rest }) => {
	const id = useId();
	const [expanded, setExpanded] = useState<boolean>(false);

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

	const buttonId = `${id}-button`;
	const listboxId = `${id}-listbox`;
	return (
		<div className={cn(styles.control)}>
			<Button
				type="button"
				role="combobox"
				id={buttonId}
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
			>
				{label}
			</Button>
			<div
				role="listbox"
				ref={listboxRef}
				id={listboxId}
				className={cn(styles.listbox, expanded && styles.expanded)}
			>
				<Sheet className={styles.listboxSheet}>{children}</Sheet>
			</div>
		</div>
	);
};
