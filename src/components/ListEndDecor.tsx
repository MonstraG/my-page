import type { FC } from "react";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";

export const ListEndDecor: FC = () => (
	<Stack gap={2} py={4} alignItems="center" width="100%">
		<Box width="50px" bgcolor="neutral.500" height="3px" borderRadius={2} />
		<Box width="20px" bgcolor="neutral.500" height="3px" borderRadius={2} />
	</Stack>
);
