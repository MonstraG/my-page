import Drawer from "@mui/joy/Drawer";
import type { FC } from "react";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import NextLink from "next/link";
import { CloseDrawer } from "@/components/CloseDrawer";
import Divider from "@mui/joy/Divider";
import { ListEndDecor } from "@/components/ListEndDecor";

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
		disableScrollLock
	>
		<CloseDrawer position="end" />

		<List size="lg" component="nav" sx={{ width: "100%", p: 0, flexGrow: 0 }}>
			<NextLink href="/public" legacyBehavior>
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
			<NextLink href="/books" legacyBehavior>
				<ListItemButton component="a" onClick={onClose}>
					Books
				</ListItemButton>
			</NextLink>
			<NextLink href="/blog" legacyBehavior>
				<ListItemButton component="a" onClick={onClose}>
					Blog thing
				</ListItemButton>
			</NextLink>
		</List>

		<Divider />

		<ListEndDecor />
	</Drawer>
);
