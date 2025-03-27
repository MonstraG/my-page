import { type DndSchool, dndSchools } from "@/components/spells/spellData/spells.types";
import { Checkbox } from "@/ui/Checkbox/Checkbox";
import { List } from "@/ui/List/List";
import { type ChangeEvent, type Dispatch, type FC, type SetStateAction, useCallback } from "react";

interface Props {
	selectedSchools: readonly DndSchool[];
	setSelectedSchools: Dispatch<SetStateAction<readonly DndSchool[]>>;
}

export const SchoolsFilter: FC<Props> = ({ selectedSchools, setSelectedSchools }) => {
	const handleAllSchoolsClick = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setSelectedSchools(() => {
				if (event.target.checked) {
					return dndSchools;
				} else {
					return [];
				}
			});
		},
		[setSelectedSchools],
	);

	const handleSchoolClick = useCallback(
		(event: ChangeEvent<HTMLInputElement>, dndSchool: DndSchool) => {
			setSelectedSchools((prev) => {
				if (event.target.checked) {
					return [...prev, dndSchool];
				} else {
					return prev.filter((item) => item !== dndSchool);
				}
			});
		},
		[setSelectedSchools],
	);

	const all = dndSchools.length === selectedSchools.length;

	return (
		<List disableGutters>
			<li>
				<Checkbox
					name="school"
					value="allSchools"
					type="checkbox"
					checked={all}
					indeterminate={!all && selectedSchools.length > 0}
					onChange={handleAllSchoolsClick}
				>
					<h6>All schools</h6>
				</Checkbox>
			</li>
			{dndSchools.map((dndSchool) => (
				<li key={dndSchool}>
					<Checkbox
						name="school"
						value={dndSchool}
						type="checkbox"
						checked={selectedSchools.includes(dndSchool)}
						onChange={(event) => handleSchoolClick(event, dndSchool)}
					>
						{dndSchool}
					</Checkbox>
				</li>
			))}
		</List>
	);
};
