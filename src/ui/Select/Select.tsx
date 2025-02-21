import styles from "./Select.module.css";
import { useId, type FC, type HTMLAttributes, useState, useEffect, useRef } from "react";
import { clsx } from "clsx";

interface Props
	extends Omit<
		HTMLAttributes<HTMLButtonElement>,
		| "type"
		| "role"
		| "id"
		| "value"
		| "aria-controls"
		| "aria-haspopup"
		| "tabIndex"
		| "aria-expanded"
	> {}

// https://www.freecodecamp.org/news/how-to-build-an-accessible-custom-dropdown-select-element/

export const Select: FC<Props> = ({ children, className, ...rest }) => {
	const id = useId();
	const [expanded, setExpanded] = useState<boolean>(false);

	const buttonRef = useRef<HTMLButtonElement>(null);
	const listboxRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!buttonRef.current || !listboxRef.current) {
			return;
		}

		function handleClick(event: MouseEvent) {
			if (!listboxRef.current || !event.target) {
				return;
			}
			if (!(event.target instanceof Element)) {
				return;
			}
			const clickOutside = !listboxRef.current.contains(event.target);
			if (clickOutside) {
				setExpanded(false);
			}
		}

		document.addEventListener("click", handleClick);
		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const buttonId = `${id}-button`;
	const listboxId = `${id}-listbox`;
	return (
		<>
			<button
				type="button"
				role="combobox"
				id={buttonId}
				value="Select"
				aria-controls={listboxId}
				aria-haspopup="listbox"
				tabIndex={0}
				aria-expanded={expanded}
				className={clsx(styles.select, className)}
				ref={buttonRef}
				onKeyDown={(event) => {
					if (event.key === "Enter" || event.key === " ") {
						setExpanded(true);
					}
					if (event.key === "Escape") {
						setExpanded(false);
					}
				}}
				{...rest}
			>
				Select
			</button>
			<ul
				role="listbox"
				ref={listboxRef}
				id={listboxId}
				className={clsx(styles.listbox, expanded && styles.expanded)}
			>
				{children}
			</ul>
		</>
	);
};
