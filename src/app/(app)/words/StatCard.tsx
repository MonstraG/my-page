import type { FC } from "react";
import Box from "@mui/joy/Box";
import { AnswerStats } from "@/app/(app)/words/AnswerStats";
import CardOverflow from "@mui/joy/CardOverflow";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionSummary from "@mui/joy/AccordionSummary";
import AccordionDetails from "@mui/joy/AccordionDetails";
import { AnswerMap } from "@/app/(app)/words/AnswerMap";
import type { LanguageProgress } from "@/app/(app)/words/useWordsStore";
import { BidirectionalCard } from "@/app/(app)/words/BidirectionalCard";

interface Props {
	progress: LanguageProgress;
	totalWords: number;
}

export const StatCard: FC<Props> = ({ progress, totalWords }) => (
	<BidirectionalCard
		slots={{
			left: (
				<Box
					flexShrink={0}
					flexBasis={{ md: "220px" }}
					sx={{ pb: { xs: 2, md: undefined } }}
				>
					<AnswerStats known={progress.known.length} unknown={progress.unknown.length} />
				</Box>
			),
			right: (
				<CardOverflow sx={{ flexGrow: 1, p: 0 }}>
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
			)
		}}
	/>
);
