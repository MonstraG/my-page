"use client";
import { ListFilter } from "@/components/spells/Filters/ListFilter";
import {
	applySetStateAction,
	type DnDFilterState,
	useDndFilterStore,
} from "@/components/spells/Filters/useDndFilterStore";
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
import { type FC, type SetStateAction, useCallback, useState } from "react";

export const MoreFilters: FC = () => {
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

					<ClassesFilterSection />
					<SchoolsFilterSection />
					<TagsFilterSection />

					<Divider />
				</Stack>
				<ListEndDecor />
			</Drawer>
		</>
	);
};

function classesSelector(state: DnDFilterState) {
	return state.classes;
}
function handleClassesChange(setStateAction: SetStateAction<readonly DndClass[]>) {
	useDndFilterStore.setState(prev => ({
		classes: applySetStateAction(prev.classes, setStateAction),
	}));
}

const ClassesFilterSection: FC = () => {
	const classes = useDndFilterStore(classesSelector);

	return (
		<Stack component="section" gap={0.5}>
			<h3>Classes</h3>
			<ListFilter
				name="classes"
				selected={classes}
				setSelected={handleClassesChange}
				options={dndClasses}
			/>
		</Stack>
	);
};

function schoolsSelector(state: DnDFilterState) {
	return state.schools;
}
function handleSchoolsChange(setStateAction: SetStateAction<readonly DndSchool[]>) {
	useDndFilterStore.setState(prev => ({
		schools: applySetStateAction(prev.schools, setStateAction),
	}));
}

const SchoolsFilterSection: FC = () => {
	const classes = useDndFilterStore(schoolsSelector);

	return (
		<Stack component="section" gap={0.5}>
			<h3>Schools</h3>
			<ListFilter
				name="schools"
				selected={classes}
				setSelected={handleSchoolsChange}
				options={dndSchools}
			/>
		</Stack>
	);
};

function tagsSelector(state: DnDFilterState) {
	return state.tags;
}
function tagsSchoolsChange(setStateAction: SetStateAction<readonly DndTag[]>) {
	useDndFilterStore.setState(prev => ({
		tags: applySetStateAction(prev.tags, setStateAction),
	}));
}

const TagsFilterSection: FC = () => {
	const tags = useDndFilterStore(tagsSelector);

	return (
		<Stack component="section" gap={0.5}>
			<h3>Tags</h3>
			<ListFilter
				name="tags"
				selected={tags}
				setSelected={tagsSchoolsChange}
				options={searchableDndTags}
			/>
		</Stack>
	);
};
