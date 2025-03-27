import { CloseDrawer } from "@/components/CloseDrawer";
import { ClassesFilter } from "@/components/spells/Filters/ClassesFilter";
import { SchoolsFilter } from "@/components/spells/Filters/SchoolsFilter";
import { type DndClass, type DndSchool } from "@/components/spells/spellData/spells.types";
import { FilterAltFilledIcon } from "@/icons/material/FilterAltFilledIcon";
import { Button } from "@/ui/Button/Button";
import { Divider } from "@/ui/Divider/Divider";
import { Drawer } from "@/ui/Drawer/Drawer";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { Stack } from "@/ui/Stack/Stack";
import { type Dispatch, type FC, type SetStateAction, useCallback, useState } from "react";

interface Props {
	selectedClasses: readonly DndClass[];
	setSelectedClasses: Dispatch<SetStateAction<readonly DndClass[]>>;
	selectedSchools: readonly DndSchool[];
	setSelectedSchools: Dispatch<SetStateAction<readonly DndSchool[]>>;
}

export const MoreFilters: FC<Props> = (
	{ selectedClasses, setSelectedClasses, selectedSchools, setSelectedSchools },
) => {
	const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

	const handleFilterDrawer = useCallback(() => {
		setFilterDrawerOpen((p) => !p);
	}, []);

	return (
		<>
			<Button
				onClick={handleFilterDrawer}
				endDecorator={<FilterAltFilledIcon />}
				active={filterDrawerOpen}
			>
				More filters
			</Button>
			<Drawer open={filterDrawerOpen}>
				<Stack gap={1}>
					<CloseDrawer position="start" onClose={handleFilterDrawer} />

					<Stack component="section" gap={0.5}>
						<h3>Class</h3>
						<ClassesFilter
							selectedClasses={selectedClasses}
							setSelectedClasses={setSelectedClasses}
						/>
					</Stack>

					<Stack component="section" gap={0.5}>
						<h3>School</h3>
						<SchoolsFilter
							selectedSchools={selectedSchools}
							setSelectedSchools={setSelectedSchools}
						/>
					</Stack>

					<Divider />
				</Stack>
				<ListEndDecor />
			</Drawer>
		</>
	);
};
