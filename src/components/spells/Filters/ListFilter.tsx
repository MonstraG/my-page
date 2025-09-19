import { Checkbox } from "@/ui/Checkbox/Checkbox";
import { List } from "@/ui/List/List";
import {
	type ChangeEvent,
	type Dispatch,
	type ReactElement,
	type SetStateAction,
	useCallback,
} from "react";

interface Props<T extends string> {
	name: string;
	selected: readonly T[];
	setSelected: Dispatch<SetStateAction<readonly T[]>>;
	options: readonly T[];
}

export function ListFilter<T extends string>({
	name,
	selected,
	setSelected,
	options,
}: Props<T>): ReactElement {
	const handleAllClick = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setSelected(() => {
				if (event.target.checked) {
					return options;
				}
				return [];
			});
		},
		[setSelected, options],
	);

	const handleOptionClick = useCallback(
		(event: ChangeEvent<HTMLInputElement>, item: T) => {
			setSelected((prev) => {
				if (event.target.checked) {
					return prev.concat(item);
				}
				return prev.filter((el) => el !== item);
			});
		},
		[setSelected],
	);

	const allSelected = options.length === selected.length;
	const someSelected = selected.length > 0;

	return (
		<List disableGutters>
			<li>
				<Checkbox
					name={name}
					value={`${name}-all`}
					type="checkbox"
					checked={allSelected}
					indeterminate={!allSelected && someSelected}
					onChange={handleAllClick}
				>
					<h6>All {name}</h6>
				</Checkbox>
			</li>
			{options.map((item) => (
				<li key={item}>
					<Checkbox
						name={name}
						value={item}
						type="checkbox"
						checked={selected.includes(item)}
						onChange={(event) => {
							handleOptionClick(event, item);
						}}
					>
						{item}
					</Checkbox>
				</li>
			))}
		</List>
	);
}
