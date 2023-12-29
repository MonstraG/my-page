"use client";
import { MediaToggleButton } from "@/components/MediaToggleButton";
import { SnackbarHost } from "@/components/SnackbarHost";
import { NavDrawer } from "@/app/(app)/NavDrawer";
import type { FCC } from "@/types/react";
import { useState } from "react";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";

export const NavigationLayout: FCC = ({ children }) => {
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	return (
		<>
			<Sheet
				component="header"
				sx={{ position: "sticky", top: 0, p: 1, zIndex: 10, elevation: 1 }}
			>
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<IconButton
						variant="outlined"
						color="neutral"
						onClick={() => setDrawerOpen(true)}
					>
						<MenuIcon />
					</IconButton>

					<MediaToggleButton />
				</Stack>
			</Sheet>
			<main>{children}</main>
			<SnackbarHost />
			<NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
		</>
	);
};
