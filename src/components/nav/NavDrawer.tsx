import Drawer from "@mui/joy/Drawer";
import type { FC } from "react";
import List from "@mui/joy/List";
import ListItemButton from "@mui/joy/ListItemButton";
import NextLink from "next/link";
import { CloseDrawer } from "@/components/CloseDrawer";
import Divider from "@mui/joy/Divider";
import { ListEndDecor } from "@/components/ListEndDecor";
import type { SxProps } from "@mui/joy/styles/types";
import Typography from "@mui/joy/Typography";

const drawerSx: SxProps = {
	position: "relative",
	"--Drawer-transitionDuration": "0.2s",
	"--Drawer-horizontalSize": "256px"
};

const linkListSx: SxProps = { width: "100%", p: 0, flexGrow: 0 };

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export const NavDrawer: FC<Props> = ({ isOpen, onClose }) => (
	<Drawer open={isOpen} onClose={onClose} sx={drawerSx} size="sm" hideBackdrop disableScrollLock>
		<CloseDrawer position="end" />

		<List size="lg" component="nav" sx={linkListSx}>
			<NextLink href="/about" legacyBehavior>
				<ListItemButton component="a" onClick={onClose}>
					About (but not really)
				</ListItemButton>
			</NextLink>
			<NextLink href="/dishes" legacyBehavior>
				<ListItemButton component="a" onClick={onClose}>
					Dishes
				</ListItemButton>
			</NextLink>
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

		<Typography textAlign="center" level="body-sm">
			{process.env.NODE_ENV} {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 6)}
		</Typography>
	</Drawer>
);
