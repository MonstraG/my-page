import type { FC } from "react";
import { AnswerStats } from "@/components/words/AnswerStats";
import { AnswerMap } from "@/components/words/AnswerMap";
import type { LanguageProgress } from "@/components/words/useWordsStore";
import { BidirectionalCard } from "@/components/words/BidirectionalCard";
import { Accordion, AccordionGroup } from "@/ui/Accordion/Accordion";

interface Props {
	progress: LanguageProgress;
	totalWords: number;
}

export const StatCard: FC<Props> = ({ progress, totalWords }) => (
	<BidirectionalCard
		slots={{
			left: (
				<div style={{ padding: "1rem" }}>
					<AnswerStats known={progress.known.length} unknown={progress.unknown.length} />
				</div>
			),
			right: (
				<>
					<AccordionGroup embedded>
						<Accordion summary="Answer map">
							<AnswerMap
								totalWords={totalWords}
								known={progress.known}
								unknown={progress.unknown}
								invalid={progress.invalid}
							/>
						</Accordion>
						<Accordion summary="Debug state">
							<pre>{JSON.stringify(progress, null, 4)}</pre>
						</Accordion>
					</AccordionGroup>
				</>
			)
		}}
	/>
);
