import type { FC } from "react";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import Divider from "@mui/joy/Divider";

interface Props {
	position: "start" | "end";
}

export const CloseDrawer: FC<Props> = ({ position }) => (
	<>
		<Stack direction="row" p={1} gap={1} justifyContent={position}>
			<Typography pl={1}>Close</Typography>
			<ModalClose sx={{ position: "initial" }} />
		</Stack>
		<Divider />
	</>
);
