"use client";
import { NavDrawer } from "@/components/nav/NavDrawer";
import type { FCC } from "@/types/react";
import { useState } from "react";
import Stack from "@mui/joy/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";

export const NavigationLayout: FCC = () => {
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	return (
		<>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				component="header"
				sx={{
					position: "sticky",
					top: 0,
					p: 1,
					zIndex: 10,
					elevation: 1
				}}
			>
				<IconButton
					variant="outlined"
					color="neutral"
					onClick={() => {
						setDrawerOpen(true);
					}}
				>
					<MenuIcon />
				</IconButton>
			</Stack>

			<NavDrawer
				isOpen={drawerOpen}
				onClose={() => {
					setDrawerOpen(false);
				}}
			/>
		</>
	);
};
