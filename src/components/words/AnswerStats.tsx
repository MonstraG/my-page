import type { FC } from "react";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ListItemContent from "@mui/joy/ListItemContent";
import CancelIcon from "@mui/icons-material/Cancel";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import { Chain } from "@/app/(app)/words/Chain";

interface Props {
	known: number;
	unknown: number;
}

export const AnswerStats: FC<Props> = ({ known, unknown }) => (
	<>
		<Typography level="h4">Stats:</Typography>

		<List sx={{ pb: 0 }}>
			<ListItem>
				<ListItemDecorator>
					<CheckCircleIcon />
				</ListItemDecorator>
				<ListItemContent>Known: {known}</ListItemContent>
			</ListItem>
			<ListItem>
				<ListItemDecorator>
					<CancelIcon />
				</ListItemDecorator>
				<ListItemContent>Unknown: {unknown}</ListItemContent>
			</ListItem>
			<ListItem>
				<ListItemDecorator>
					<GolfCourseIcon />
				</ListItemDecorator>
				<ListItemContent>
					Percentage:{" "}
					{
						new Chain(known + unknown)
							.then((total) => Math.max(total, 1))
							.then((total) => known / total)
							.then((ratio) => ratio * 100)
							.then((percentage) => percentage.toFixed(2)).result
					}
					%
				</ListItemContent>
			</ListItem>
		</List>
	</>
);
