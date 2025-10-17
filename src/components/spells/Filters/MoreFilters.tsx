"use client";
import { ListFilter } from "@/components/spells/Filters/ListFilter";
import {
	type DnDFilterState,
	useDndFilterStore,
} from "@/components/spells/Filters/useDndFilterStore";
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

					<FilterSection header="Classes" prop="classes" options={dndClasses} />
					<FilterSection header="Schools" prop="schools" options={dndSchools} />
					<FilterSection header="Tags" prop="tags" options={searchableDndTags} />
					<FilterSection header="Sources" prop="sources" options={dndSources} />

					<Divider />
				</Stack>
				<ListEndDecor />
			</Drawer>
		</>
	);
};

type CheckboxableFilters = Omit<DnDFilterState, "search">;

const FilterSection = <T extends keyof CheckboxableFilters>({
	header,
	prop,
	options,
}: {
	header: string;
	prop: T;
	options: CheckboxableFilters[T];
}) => {
	const selected = useDndFilterStore((state) => state[prop]);

	return (
		<Stack component="section" gap={0.5}>
			<h4>{header}</h4>
			<ListFilter
				name={prop}
				selected={selected}
				setSelected={(action) =>
					useDndFilterStore.setState((prev) => ({
						[prop]: applySetStateAction(prev[prop], action),
					}))
				}
				options={options}
			/>
		</Stack>
	);
};
