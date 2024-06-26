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
import { EB_Garamond } from "next/font/google";

const minFontSize = 10;
const maxFontSize = 30;
const minFontWeight = 300;
const maxFontWeight = 600;

const handleWideModeToggle = () => {
	useBookControlsStore.setState((prev) => ({ wide: !prev.wide }));
};
const handleFontSizeDecrease = () => {
	useBookControlsStore.setState((prev) => ({
		fontSize: Math.max(prev.fontSize - 1, minFontSize)
	}));
};
const handleFontSizeIncrease = () => {
	useBookControlsStore.setState((prev) => ({
		fontSize: Math.min(prev.fontSize + 1, maxFontSize)
	}));
};
const handleFontWeightDecrease = () => {
	useBookControlsStore.setState((prev) => ({
		fontWeight: Math.max(prev.fontWeight - 100, minFontWeight)
	}));
};
const handleFontWeightIncrease = () => {
	useBookControlsStore.setState((prev) => ({
		fontWeight: Math.min(prev.fontWeight + 100, maxFontWeight)
	}));
};
const handleSansSerifToggle = () => {
	useBookControlsStore.setState((prev) => ({ sansSerif: !prev.sansSerif }));
};

const garamond = EB_Garamond({
	subsets: ["latin", "cyrillic", "cyrillic-ext"],
	adjustFontFallback: false, // prevent NextJS from adding its own fallback font
	fallback: ["var(--joy-fontFamily-fallback)"], // use Joy UI's fallback font
	display: "swap"
});

const sepiaSx: SxProps = {
	background: "#F4ECD8",
	color: "#5F4B32"
};

export const BookNavLayout: FCC = ({ children }) => {
	const { wide, fontSize, fontWeight, sansSerif } = useBookControlsStore();

	const { mode } = useColorScheme();

	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

	const rendered = useHasRendered();
	if (!rendered) {
		return null;
	}

	const fontFamilyStyles = sansSerif ? {} : garamond.style;

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
							<ListItem sx={{ justifyContent: "space-between" }}>
								Font weight
								<ListItemDecorator sx={{ minWidth: "unset", pr: 1, gap: 0.5 }}>
									<Button
										variant="plain"
										color="neutral"
										size="sm"
										sx={{ px: 0.5 }}
										onClick={handleFontWeightDecrease}
										disabled={fontSize <= minFontSize}
									>
										<RemoveIcon />
									</Button>

									{fontWeight / 100}

									<Button
										variant="plain"
										color="neutral"
										size="sm"
										sx={{ px: 0.5 }}
										onClick={handleFontWeightIncrease}
										disabled={fontSize >= maxFontSize}
									>
										<AddIcon />
									</Button>
								</ListItemDecorator>
							</ListItem>
							<MenuItem
								onClick={handleSansSerifToggle}
								sx={{ justifyContent: "space-between" }}
							>
								Use sans-serif font
								<ListItemDecorator sx={{ minWidth: "unset", pr: 1 }}>
									<CheckIcon
										sx={{ visibility: sansSerif ? undefined : "hidden" }}
									/>
								</ListItemDecorator>
							</MenuItem>
						</Menu>
					</Dropdown>
				</div>
			</Stack>
			<Container
				maxWidth={wide ? false : "md"}
				style={{ ...fontFamilyStyles, fontSize, fontWeight }}
				component="main"
			>
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
