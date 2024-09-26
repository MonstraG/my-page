import type { FC } from "react";
import Stack from "@mui/joy/Stack";
import Box from "@mui/joy/Box";

export const ListEndDecor: FC = () => (
	<Stack gap={2} py={4} pb={2} alignItems="center" width="100%">
		<Box width="50px" bgcolor="background.level2" height="2px" borderRadius={2} />
		<Box width="20px" bgcolor="background.level2" height="2px" borderRadius={2} />
	</Stack>
);
