"use client";
import { ListFilter } from "@/components/spells/Filters/ListFilter";
import { useDndFilterStore } from "@/components/spells/Filters/useDndFilterStore";
import {
	dndClasses,
	dndSchools,
	dndSources,
	searchableDndTags,
} from "@/components/spells/spellData/spells.types";
import { applySetStateAction } from "@/functions/applySetStateAction";
import { CloseIcon } from "@/icons/material/CloseIcon";
import { FilterAltFilledIcon } from "@/icons/material/FilterAltFilledIcon";
import { Button } from "@/ui/Button/Button";
import { Divider } from "@/ui/Divider/Divider";
import { Drawer } from "@/ui/Drawer/Drawer";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { Stack } from "@/ui/Stack/Stack";
import { type FC, useState } from "react";

export const MoreFilters: FC = () => {
	const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

	const handleFilterDrawerClick = () => setFilterDrawerOpen((p) => !p);

	return (
		<>
			<Button
				onClick={handleFilterDrawerClick}
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
						onClick={handleFilterDrawerClick}
					>
						Close
					</Button>

					<Divider />

					<ClassesFilterSection />
					<SchoolsFilterSection />
					<TagsFilterSection />
					<SourcesFilterSection />

					<Divider />
				</Stack>
				<ListEndDecor />
			</Drawer>
		</>
	);
};

const ClassesFilterSection: FC = () => {
	const classes = useDndFilterStore((state) => state.classes);

	return (
		<Stack component="section" gap={0.5}>
			<h4>Classes</h4>
			<ListFilter
				name="classes"
				selected={classes}
				setSelected={(action) =>
					useDndFilterStore.setState((prev) => ({
						classes: applySetStateAction(prev.classes, action),
					}))
				}
				options={dndClasses}
			/>
		</Stack>
	);
};

const SchoolsFilterSection: FC = () => {
	const classes = useDndFilterStore((state) => state.schools);

	return (
		<Stack component="section" gap={0.5}>
			<h4>Schools</h4>
			<ListFilter
				name="schools"
				selected={classes}
				setSelected={(action) =>
					useDndFilterStore.setState((prev) => ({
						schools: applySetStateAction(prev.schools, action),
					}))
				}
				options={dndSchools}
			/>
		</Stack>
	);
};

const TagsFilterSection: FC = () => {
	const tags = useDndFilterStore((state) => state.tags);

	return (
		<Stack component="section" gap={0.5}>
			<h4>Tags</h4>
			<ListFilter
				name="tags"
				selected={tags}
				setSelected={(action) =>
					useDndFilterStore.setState((prev) => ({
						tags: applySetStateAction(prev.tags, action),
					}))
				}
				options={searchableDndTags}
			/>
		</Stack>
	);
};

const SourcesFilterSection: FC = () => {
	const sources = useDndFilterStore((state) => state.sources);

	return (
		<Stack component="section" gap={0.5}>
			<h4>Sources</h4>
			<ListFilter
				name="sources"
				selected={sources}
				setSelected={(action) =>
					useDndFilterStore.setState((prev) => ({
						sources: applySetStateAction(prev.sources, action),
					}))
				}
				options={dndSources}
			/>
		</Stack>
	);
};
