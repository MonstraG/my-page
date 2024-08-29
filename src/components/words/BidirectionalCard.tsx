import type { FC, ReactNode } from "react";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";

interface Props {
	slots: {
		left: ReactNode;
		right: ReactNode;
	};
}

/**
 * Exists because https://github.com/mui/material-ui/issues/40904 doesn't
 */
export const BidirectionalCard: FC<Props> = ({ slots }) => (
	<>
		<Card
			orientation="horizontal"
			variant="outlined"
			sx={{ gap: 0, display: { xs: "none", md: "flex" } }}
		>
			{slots.left}
			<Divider />
			{slots.right}
		</Card>

		<Card
			orientation="vertical"
			variant="outlined"
			sx={{ gap: 0, display: { xs: "flex", md: "none" } }}
		>
			{slots.left}
			<Divider />
			{slots.right}
		</Card>
	</>
);
