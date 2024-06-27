import { type FC, useState } from "react";
import MenuButton from "@mui/joy/MenuButton";
import Button from "@mui/joy/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import Menu from "@mui/joy/Menu";
import MenuItem, { type MenuItemProps } from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import CheckIcon from "@mui/icons-material/Check";
import ListItem from "@mui/joy/ListItem";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/joy/Divider";
import Dropdown from "@mui/joy/Dropdown";
import { type BookFontFamily, useBookControlsStore } from "@/app/(books)/useBookControlsStore";
import type { FCC } from "@/types/react";

const minFontSize = 10;
const maxFontSize = 30;
const minFontWeight = 300;
const maxFontWeight = 600;

const handleWideModeToggle = () => {
	useBookControlsStore.setState((prev) => ({ wide: !prev.wide }));
};
const handleJustifyToggle = () => {
	useBookControlsStore.setState((prev) => ({ justify: !prev.justify }));
};
const handleHyphenateToggle = () => {
	useBookControlsStore.setState((prev) => ({ hyphenate: !prev.hyphenate }));
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
const handleFontFamilyChange = (newFontFamily: BookFontFamily) => {
	useBookControlsStore.setState({ fontFamily: newFontFamily });
};

export const BookSettings: FC = () => {
	const { wide, justify, hyphenate, fontSize, fontWeight, fontFamily } = useBookControlsStore();
	const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

	return (
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
				<CheckableMenuItem onClick={handleWideModeToggle} checked={wide}>
					Wide mode
				</CheckableMenuItem>
				<CheckableMenuItem onClick={handleJustifyToggle} checked={justify}>
					Justify text
				</CheckableMenuItem>
				<CheckableMenuItem onClick={handleHyphenateToggle} checked={hyphenate}>
					Hyphenate text
				</CheckableMenuItem>
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
				<Divider />
				<MenuItem disabled sx={{ fontSize: 14 }}>
					Font family
				</MenuItem>
				<CheckableMenuItem
					onClick={() => {
						handleFontFamilyChange("Inter");
					}}
					checked={fontFamily === "Inter"}
				>
					Inter
				</CheckableMenuItem>
				<CheckableMenuItem
					onClick={() => {
						handleFontFamilyChange("Garamond");
					}}
					checked={fontFamily === "Garamond"}
				>
					Garamond
				</CheckableMenuItem>
				<CheckableMenuItem
					onClick={() => {
						handleFontFamilyChange("system serif");
					}}
					checked={fontFamily === "system serif"}
				>
					System serif
				</CheckableMenuItem>
				<CheckableMenuItem
					onClick={() => {
						handleFontFamilyChange("system sans-serif");
					}}
					checked={fontFamily === "system sans-serif"}
				>
					System sans-serif
				</CheckableMenuItem>
			</Menu>
		</Dropdown>
	);
};

interface CheckableMenuItemProps {
	checked: boolean;
	onClick: MenuItemProps["onClick"];
}

const CheckableMenuItem: FCC<CheckableMenuItemProps> = ({ children, checked, onClick }) => (
	<MenuItem onClick={onClick} sx={{ justifyContent: "space-between" }}>
		{children}
		<ListItemDecorator sx={{ minWidth: "unset", pr: 1 }}>
			<CheckIcon sx={{ visibility: checked ? undefined : "hidden" }} />
		</ListItemDecorator>
	</MenuItem>
);
