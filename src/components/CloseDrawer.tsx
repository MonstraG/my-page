import { type FC } from "react";
import { Divider } from "@/ui/Divider/Divider";
import { Button } from "@/ui/Button/Button";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
	position: "start" | "end";
	onClose: () => void;
}

export const CloseDrawer: FC<Props> = ({ position, onClose }) => (
	<>
		<Button
			endDecorator={<CloseIcon />}
			style={{ alignSelf: position, margin: "0.5rem" }}
			size="sm"
			onClick={onClose}
		>
			Close
		</Button>
		<Divider />
	</>
);
