import { CloseDrawer } from "@/components/CloseDrawer";
import { type DndClass, dndClasses } from "@/components/spells/spellData/spells.types";
import { FilterAltFilledIcon } from "@/icons/FilterAltFilledIcon";
import { Button } from "@/ui/Button/Button";
import { Checkbox } from "@/ui/Checkbox/Checkbox";
import { Divider } from "@/ui/Divider/Divider";
import { Drawer } from "@/ui/Drawer/Drawer";
import { List } from "@/ui/List/List";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { Stack } from "@/ui/Stack/Stack";
import {
	type ChangeEvent,
	type Dispatch,
	type FC,
	type SetStateAction,
	useCallback,
	useState,
} from "react";

interface Props {
	selectedClasses: readonly DndClass[];
	setSelectedClasses: Dispatch<SetStateAction<readonly DndClass[]>>;
}

export const MoreFilters: FC<Props> = ({ selectedClasses, setSelectedClasses }) => {
	const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

	const handleFilterDrawer = useCallback(() => {
		setFilterDrawerOpen((p) => !p);
	}, []);

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

	return (
		<>
			<Button onClick={handleFilterDrawer} endDecorator={<FilterAltFilledIcon />}>
				More filters
			</Button>
			<Drawer open={filterDrawerOpen}>
				<Stack gap={1}>
					<CloseDrawer position="start" onClose={handleFilterDrawer} />
					<h3>Class</h3>
					<List>
						<li style={{ padding: 0 }}>
							<Checkbox
								type="checkbox"
								checked={dndClasses.length === selectedClasses.length}
								onChange={handleAllClassesClick}
							>
								All classes
							</Checkbox>
						</li>
						{dndClasses.map((dndClass) => (
							<li style={{ padding: 0 }} key={dndClass}>
								<Checkbox
									type="checkbox"
									checked={selectedClasses.includes(dndClass)}
									onChange={(event) => handleClassClick(event, dndClass)}
								>
									{dndClass}
								</Checkbox>
							</li>
						))}
					</List>
				</Stack>
				<Divider />
				<ListEndDecor />
			</Drawer>
		</>
	);
};
