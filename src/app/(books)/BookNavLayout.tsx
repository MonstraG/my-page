"use client";
import { ColorSchemeToggleButton } from "@/components/ColorSchemeToggleButton";
import { SnackbarHost } from "@/components/SnackbarHost";
import { NavDrawer } from "@/app/(app)/NavDrawer";
import type { FCC } from "@/types/react";
import { useState } from "react";
import Stack from "@mui/joy/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import type { SxProps } from "@mui/joy/styles/types";
import { useBookControlsStore } from "@/app/(books)/useBookControlsStore";
import { useColorScheme } from "@mui/joy/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "@mui/joy/Button";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import Dropdown from "@mui/joy/Dropdown";
import MenuItem from "@mui/joy/MenuItem";
import { useHasRendered } from "@/components/useHasRendered";
import CheckIcon from "@mui/icons-material/Check";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ListItem from "@mui/joy/ListItem";
import Container from "@mui/joy/Container";

const minFontSize = 12;
const maxFontSize = 30;

const handleWideModeToggle = () => {
	useBookControlsStore.setState((prev) => ({ wide: !prev.wide }));
};
const handleFontSizeDecrease = () => {
	useBookControlsStore.setState((prev) => ({
		fontSize: Math.max(prev.fontSize - 2, minFontSize)
	}));
};
const handleFontSizeIncrease = () => {
	useBookControlsStore.setState((prev) => ({
		fontSize: Math.min(prev.fontSize + 2, maxFontSize)
	}));
};

const sepiaSx: SxProps = {
	background: "#F4ECD8",
	color: "#5F4B32"
};

export const BookNavLayout: FCC = ({ children }) => {
	const { wide, fontSize } = useBookControlsStore();

	const { mode } = useColorScheme();

	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

	const rendered = useHasRendered();
	if (!rendered) {
		return null;
	}

	return (
		<Box sx={mode === "light" ? sepiaSx : undefined}>
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

				<div>
					<ColorSchemeToggleButton />

					<Dropdown
						open={settingsOpen}
						onOpenChange={(event, newOpen) => {
							if (event != null && !newOpen && event.type === "click") {
								return;
							}
							setSettingsOpen(newOpen);
						}}
					>
						<MenuButton
							slots={{ root: Button }}
							slotProps={{
								root: {
									variant: "plain",
									color: "neutral",
									size: "sm",
									sx: { px: 0.75 }
								}
							}}
						>
							<SettingsIcon />
						</MenuButton>
						<Menu placement="bottom-end">
							<MenuItem
								onClick={handleWideModeToggle}
								sx={{ justifyContent: "space-between" }}
							>
								Use wide mode
								<ListItemDecorator sx={{ minWidth: "unset", pr: 1 }}>
									<CheckIcon sx={{ visibility: wide ? undefined : "hidden" }} />
								</ListItemDecorator>
							</MenuItem>
							<ListItem sx={{ justifyContent: "space-between" }}>
								Font size
								<ListItemDecorator sx={{ minWidth: "unset", pr: 1, gap: 0.5 }}>
									<Button
										variant="plain"
										color="neutral"
										size="sm"
										sx={{ px: 0.5 }}
										onClick={handleFontSizeDecrease}
										disabled={fontSize <= minFontSize}
									>
										<RemoveIcon />
									</Button>

									{fontSize}

									<Button
										variant="plain"
										color="neutral"
										size="sm"
										sx={{ px: 0.5 }}
										onClick={handleFontSizeIncrease}
										disabled={fontSize >= maxFontSize}
									>
										<AddIcon />
									</Button>
								</ListItemDecorator>
							</ListItem>
						</Menu>
					</Dropdown>
				</div>
			</Stack>
			<Container maxWidth={wide ? false : "md"} style={{ fontSize }} component="main">
				{children}
			</Container>
			<SnackbarHost />
			<NavDrawer
				isOpen={drawerOpen}
				onClose={() => {
					setDrawerOpen(false);
				}}
			/>
		</Box>
	);
};
