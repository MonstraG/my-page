import type { FC } from "react";
import { Chain } from "@/components/words/Chain";
import { List } from "@/ui/List/List";
import { CheckCircleFilledIcon } from "@/icons/CheckCircleFilledIcon";
import { CancelFilledIcon } from "@/icons/CancelFilledIcon";
import { GolfCourseIcon } from "@/icons/GolfCourseIcon";

interface Props {
	known: number;
	unknown: number;
}

export const AnswerStats: FC<Props> = ({ known, unknown }) => (
	<>
		<h4>Stats:</h4>

		<List>
			<li>
				<CheckCircleFilledIcon />
				<span>Known: {known}</span>
			</li>
			<li>
				<CancelFilledIcon />
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
