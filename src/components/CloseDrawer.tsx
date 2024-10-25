import { use, type FC } from "react";
import Divider from "@mui/joy/Divider";
import Button from "@mui/joy/Button";
import CloseIcon from "@mui/icons-material/Close";
import CloseModalContext from "@mui/joy/Modal/CloseModalContext";

interface Props {
	position: "start" | "end";
}

export const CloseDrawer: FC<Props> = ({ position }) => {
	const onClose = use(CloseModalContext);

	return (
		<>
			<Button
				variant="plain"
				color="neutral"
				endDecorator={<CloseIcon />}
				sx={{ alignSelf: position, m: 1, minHeight: "unset" }}
				size="sm"
				onClick={(e) => onClose?.(e, "closeClick")}
			>
				Close
			</Button>
			<Divider />
		</>
	);
};
