import Drawer from "@mui/joy/Drawer";
import type { FC } from "react";
import ModalClose from "@mui/joy/ModalClose";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import NextLink from "next/link";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export const NavDrawer: FC<Props> = ({ isOpen, onClose }) => (
	<Drawer
		open={isOpen}
		onClose={onClose}
		sx={{
			position: "relative",
			"--Drawer-transitionDuration": "0.2s",
			"--Drawer-horizontalSize": "256px"
		}}
		size="sm"
		hideBackdrop
	>
		<Stack direction="row" p={1} pb={0} gap={1} display="flex" justifyContent="flex-end">
			<Typography>Close</Typography>
			<ModalClose sx={{ position: "initial" }} />
		</Stack>

		<List size="lg" component="nav" sx={{ width: "100%", p: 0 }}>
			<NextLink href="/" legacyBehavior>
				<ListItemButton component="a" onClick={onClose}>
					Dice rolling
				</ListItemButton>
			</NextLink>
			<NextLink href="/words" legacyBehavior>
				<ListItemButton component="a" onClick={onClose}>
					Vocabulary tester
				</ListItemButton>
			</NextLink>
			<NextLink href="/dnd-spells" legacyBehavior>
				<ListItemButton component="a" onClick={onClose}>
					DnD spells
				</ListItemButton>
			</NextLink>
		</List>
	</Drawer>
);
