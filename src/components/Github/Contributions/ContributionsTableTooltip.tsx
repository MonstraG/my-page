import type { FC } from "react";
import Tooltip from "@mui/joy/Tooltip";
import InfoIcon from "@mui/icons-material/Info";

export const ContributionsTableTooltip: FC = () => (
	<Tooltip
		size="sm"
		title={
			<>
				Fetches data from github, re-implemented from scratch.
				<div>And maybe it should have been a table.</div>
			</>
		}
	>
		<InfoIcon />
	</Tooltip>
);
