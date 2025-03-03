import {
	type ChangeEvent,
	type Dispatch,
	type FC,
	type SetStateAction,
	useCallback,
	useState
} from "react";
import { CloseDrawer } from "@/components/CloseDrawer";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import { dndClasses } from "@/components/spells/spellData/spells.types";
import { Button } from "@/ui/Button/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Divider } from "@/ui/Divider/Divider";
import { Drawer } from "@/ui/Drawer/Drawer";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import { List } from "@/ui/List/List";
import { Checkbox } from "@/ui/Checkbox/Checkbox";

const dndClassOptions = Object.entries(dndClasses).map(([id, name]) => ({
	id: Number(id),
	name
}));

export const fullDndClassSelection = dndClassOptions.map((o) => o.id);

interface Props {
	selectedClasses: number[];
	setSelectedClasses: Dispatch<SetStateAction<number[]>>;
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
					return fullDndClassSelection;
				} else {
					return [];
				}
			});
		},
		[setSelectedClasses]
	);

	const handleClassClick = useCallback(
		(event: ChangeEvent<HTMLInputElement>, dndClassId: number) => {
			setSelectedClasses((prev) => {
				if (event.target.checked) {
					return [...prev, dndClassId];
				} else {
					return prev.filter((item) => item !== dndClassId);
				}
			});
		},
		[setSelectedClasses]
	);

	return (
		<>
			<Button onClick={handleFilterDrawer} endDecorator={<FilterAltIcon />}>
				More filters
			</Button>
			<Drawer open={filterDrawerOpen}>
				<Stack gap={1}>
					<CloseDrawer position="start" onClose={handleFilterDrawer} />
					<h3>Class</h3>
					<Paragraph size="sm">
						Searches trough classes in regular edition and Tashas couldron
					</Paragraph>
					<List>
						<li style={{ padding: 0 }}>
							<Checkbox
								type="checkbox"
								checked={fullDndClassSelection.length === selectedClasses.length}
								onChange={handleAllClassesClick}
							>
								All classes
							</Checkbox>
						</li>
						{dndClassOptions.map((dndClass) => (
							<li style={{ padding: 0 }} key={dndClass.id}>
								<Checkbox
									type="checkbox"
									checked={selectedClasses.includes(dndClass.id)}
									onChange={(event) => handleClassClick(event, dndClass.id)}
								>
									{dndClass.name}
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
