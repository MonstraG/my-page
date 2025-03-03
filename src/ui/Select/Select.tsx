import styles from "./Select.module.css";
import {
	useId,
	type FC,
	useState,
	useEffect,
	useRef,
	type KeyboardEvent,
	useCallback
} from "react";
import { clsx } from "clsx";
import sheetStyles from "@/ui/Sheet/Sheet.module.css";
import { Button, type ButtonProps } from "@/ui/Button/Button";
import { UnfoldMoreIcon } from "@/icons/UnfoldMoreIcon";

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
	const listboxRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!buttonRef.current || !listboxRef.current) {
			return;
		}

		const abortController = new AbortController();

		document.addEventListener(
			"click",
			function handleClick(event) {
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
				signal: abortController.signal
			}
		);
		return () => {
			abortController.abort();
		};
	}, []);

	const handleClick = useCallback(() => {
		setExpanded(true);
	}, []);

	const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
		if (event.key === "Enter" || event.key === " ") {
			setExpanded(true);
			return;
		}
		if (event.key === "Escape") {
			setExpanded(false);
		}
	}, []);

	const buttonId = `${id}-button`;
	const listboxId = `${id}-listbox`;
	return (
		<div className={clsx(styles.control)}>
			<Button
				type="button"
				role="combobox"
				id={buttonId}
				value="Select"
				aria-controls={listboxId}
				aria-haspopup="listbox"
				tabIndex={0}
				aria-expanded={expanded}
				className={clsx(styles.select, className)}
				endDecorator={<UnfoldMoreIcon />}
				ref={buttonRef}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				alignment="start"
				{...rest}
			>
				{label}
			</Button>
			<ul
				role="listbox"
				ref={listboxRef}
				id={listboxId}
				className={clsx(styles.listbox, sheetStyles.sheet, expanded && styles.expanded)}
			>
				{children}
			</ul>
		</div>
	);
};
