import type { FC } from "react";
import Box from "@mui/joy/Box";
import { AnswerStats } from "@/components/words/AnswerStats";
import CardOverflow from "@mui/joy/CardOverflow";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionSummary from "@mui/joy/AccordionSummary";
import AccordionDetails from "@mui/joy/AccordionDetails";
import { AnswerMap } from "@/components/words/AnswerMap";
import type { LanguageProgress } from "@/components/words/useWordsStore";
import { BidirectionalCard } from "@/components/words/BidirectionalCard";

interface Props {
	progress: LanguageProgress;
	totalWords: number;
}

export const StatCard: FC<Props> = ({ progress, totalWords }) => (
	<BidirectionalCard
		slots={{
			left: (
				<Box flexShrink={0} sx={{ p: 2, pb: { xs: 2, md: undefined } }}>
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
