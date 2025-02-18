import { type Dispatch, type FC, type SetStateAction, useCallback, useState } from "react";
import Drawer from "@mui/joy/Drawer";
import { CloseDrawer } from "@/components/CloseDrawer";
import { ListEndDecor } from "@/ui/ListEndDecor/ListEndDecor";
import Typography from "@mui/joy/Typography";
import Checkbox from "@mui/joy/Checkbox";
import Stack from "@mui/joy/Stack";
import { dndClasses } from "@/components/spells/spellData/spells.types";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Divider from "@mui/joy/Divider";
import { Button } from "@/ui/Button/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

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

	return (
		<>
			<Button onClick={handleFilterDrawer} endDecorator={<FilterAltIcon />}>
				More filters
			</Button>
			<Drawer
				anchor="right"
				open={filterDrawerOpen}
				onClose={handleFilterDrawer}
				sx={{
					position: "relative",
					"--Drawer-transitionDuration": "0.2s",
					"--Drawer-horizontalSize": "256px"
				}}
				size="sm"
				hideBackdrop
				disableScrollLock
			>
				<CloseDrawer position="start" onClose={handleFilterDrawer} />
				<Stack p={2} py={1}>
					<Typography level="h3">Class</Typography>
					<Typography level="body-xs">
						Searches trough classes in regular edition and Tashas couldron
					</Typography>
					<List>
						<ListItem sx={{ px: 0 }}>
							<Checkbox
								label="All classes"
								checked={fullDndClassSelection.length === selectedClasses.length}
								indeterminate={
									fullDndClassSelection.length !== selectedClasses.length &&
									selectedClasses.length > 0
								}
								onChange={(e) => {
									setSelectedClasses(() => {
										if (e.target.checked) {
											return fullDndClassSelection;
										} else {
											return [];
										}
									});
								}}
							/>
						</ListItem>
						{dndClassOptions.map((dndClass) => (
							<ListItem key={dndClass.id} sx={{ px: 0 }}>
								<Checkbox
									label={dndClass.name}
									checked={selectedClasses.includes(dndClass.id)}
									onChange={(e) => {
										setSelectedClasses((prev) => {
											if (e.target.checked) {
												return [...prev, dndClass.id];
											} else {
												return prev.filter((x) => x !== dndClass.id);
											}
										});
									}}
								/>
							</ListItem>
						))}
					</List>
				</Stack>
				<Divider />
				<ListEndDecor />
			</Drawer>
		</>
	);
};
