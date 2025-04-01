import { ListFilter } from "@/components/spells/Filters/ListFilter";
import {
	type DndClass,
	dndClasses,
	type DndSchool,
	dndSchools,
	type DndTag,
	searchableDndTags,
} from "@/components/spells/spellData/spells.types";
import { CloseIcon } from "@/icons/material/CloseIcon";
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
	selectedTags: readonly DndTag[];
	setSelectedTags: Dispatch<SetStateAction<readonly DndTag[]>>;
}

export const MoreFilters: FC<Props> = (
	{
		selectedClasses,
		setSelectedClasses,
		selectedSchools,
		setSelectedSchools,
		selectedTags,
		setSelectedTags,
	},
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
					<Button
						endDecorator={<CloseIcon />}
						style={{ alignSelf: "start" }}
						size="sm"
						onClick={handleFilterDrawer}
					>
						Close
					</Button>

					<Divider />

					<Stack component="section" gap={0.5}>
						<h3>Classes</h3>
						<ListFilter
							name="classes"
							selected={selectedClasses}
							setSelected={setSelectedClasses}
							options={dndClasses}
						/>
					</Stack>

					<Stack component="section" gap={0.5}>
						<h3>Schools</h3>
						<ListFilter
							name="schools"
							selected={selectedSchools}
							setSelected={setSelectedSchools}
							options={dndSchools}
						/>
					</Stack>

					<Stack component="section" gap={0.5}>
						<h3>Tags</h3>
						<ListFilter
							name="tags"
							selected={selectedTags}
							setSelected={setSelectedTags}
							options={searchableDndTags}
						/>
					</Stack>

					<Divider />
				</Stack>
				<ListEndDecor />
			</Drawer>
		</>
	);
};
