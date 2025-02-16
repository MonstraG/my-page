import type { FC } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import { Chain } from "@/components/words/Chain";
import { List } from "@/ui/List/List";

interface Props {
	known: number;
	unknown: number;
}

export const AnswerStats: FC<Props> = ({ known, unknown }) => (
	<>
		<h4>Stats:</h4>

		<List>
			<li>
				<CheckCircleIcon />
				<span>Known: {known}</span>
			</li>
			<li>
				<CancelIcon />
				<span>Unknown: {unknown}</span>
			</li>
			<li>
				<GolfCourseIcon />
				<span>
					Percentage:{" "}
					{
						new Chain(known + unknown)
							.then((total) => Math.max(total, 1))
							.then((total) => known / total)
							.then((ratio) => ratio * 100)
							.then((percentage) => percentage.toFixed(2)).result
					}
					%
				</span>
			</li>
		</List>
	</>
);
