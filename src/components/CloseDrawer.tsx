import { CloseIcon } from "@/icons/CloseIcon";
import { Button } from "@/ui/Button/Button";
import { Divider } from "@/ui/Divider/Divider";
import { type FC } from "react";

interface Props {
	position: "start" | "end";
	onClose: () => void;
}

export const CloseDrawer: FC<Props> = ({ position, onClose }) => (
	<>
		<Button
			endDecorator={<CloseIcon />}
			style={{ alignSelf: position }}
			size="sm"
			onClick={onClose}
		>
			Close
		</Button>
		<Divider />
	</>
);
