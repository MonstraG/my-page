import type { FC } from "react";
import Card from "@mui/joy/Card";
import Box from "@mui/joy/Box";
import { AnswerStats } from "@/app/(app)/words/AnswerStats";
import Divider from "@mui/joy/Divider";
import CardOverflow from "@mui/joy/CardOverflow";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionSummary from "@mui/joy/AccordionSummary";
import AccordionDetails from "@mui/joy/AccordionDetails";
import { AnswerMap } from "@/app/(app)/words/AnswerMap";
import type { LanguageProgress } from "@/app/(app)/words/useWordsStore";

interface Props {
	progress: LanguageProgress;
	totalWords: number;
}

export const StatCard: FC<Props> = ({ progress, totalWords }) => (
	<Card orientation="horizontal" variant="outlined" sx={{ gap: 0 }}>
		<Box flexShrink={0} flexBasis="210px">
			<AnswerStats known={progress.known.length} unknown={progress.unknown.length} />
		</Box>

		<Divider />

		<CardOverflow sx={{ width: "100%", py: 0 }}>
			<AccordionGroup>
				<Accordion>
					<AccordionSummary>Answer map</AccordionSummary>
					<AccordionDetails>
						<AnswerMap
							totalWords={totalWords}
							known={progress.known}
							unknown={progress.unknown}
							invalid={progress.invalid}
						/>
					</AccordionDetails>
				</Accordion>
				<Accordion>
					<AccordionSummary>Debug state</AccordionSummary>
					<AccordionDetails>
						<pre>{JSON.stringify(progress, null, 4)}</pre>
					</AccordionDetails>
				</Accordion>
			</AccordionGroup>
		</CardOverflow>
	</Card>
);
