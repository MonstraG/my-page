import { type DndClass, dndClasses } from "@/components/spells/spellData/spells.types";
import { Checkbox } from "@/ui/Checkbox/Checkbox";
import { List } from "@/ui/List/List";
import { type ChangeEvent, type Dispatch, type FC, type SetStateAction, useCallback } from "react";

interface Props {
	selectedClasses: readonly DndClass[];
	setSelectedClasses: Dispatch<SetStateAction<readonly DndClass[]>>;
}

export const ClassesFilter: FC<Props> = ({ selectedClasses, setSelectedClasses }) => {
	const handleAllClassesClick = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setSelectedClasses(() => {
				if (event.target.checked) {
					return dndClasses;
				} else {
					return [];
				}
			});
		},
		[setSelectedClasses],
	);

	const handleClassClick = useCallback(
		(event: ChangeEvent<HTMLInputElement>, dndClass: DndClass) => {
			setSelectedClasses((prev) => {
				if (event.target.checked) {
					return [...prev, dndClass];
				} else {
					return prev.filter((item) => item !== dndClass);
				}
			});
		},
		[setSelectedClasses],
	);

	const all = dndClasses.length === selectedClasses.length;

	return (
		<List disableGutters>
			<li>
				<Checkbox
					name="class"
					value="allClasses"
					type="checkbox"
					checked={all}
					indeterminate={!all && selectedClasses.length > 0}
					onChange={handleAllClassesClick}
				>
					<h6>All classes</h6>
				</Checkbox>
			</li>
			{dndClasses.map((dndClass) => (
				<li key={dndClass}>
					<Checkbox
						name="class"
						value={dndClass}
						type="checkbox"
						checked={selectedClasses.includes(dndClass)}
						onChange={(event) => handleClassClick(event, dndClass)}
					>
						{dndClass}
					</Checkbox>
				</li>
			))}
		</List>
	);
};
