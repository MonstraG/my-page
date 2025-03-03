import type { FC } from "react";
import { Stack } from "@/ui/Stack/Stack";
import type { Dictionary } from "@/components/words/DictionaryApi/DictionaryApi.types";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Button } from "@/ui/Button/Button";
import { Divider } from "@/ui/Divider/Divider";
import { ChevronLeftIcon } from "@/icons/ChevronLeftIcon";
import { ChevronRightIcon } from "@/icons/ChevronRightIcon";

export const emptyDictionary: Dictionary = {
	meanings: null,
	index: 0
};

interface Props {
	dictionary: Dictionary;
	toPreviousMeaning: () => void;
	toNextMeaning: () => void;
}

export const DictionaryApiViewer: FC<Props> = ({
	dictionary,
	toPreviousMeaning,
	toNextMeaning
}) => {
	const { meanings, index } = dictionary;

	if (meanings == null) {
		return (
			<Stack style={{ justifyContent: "center", height: "100%" }}>
				<Paragraph centered size="lg" color="gray">
					Definition will appear here
				</Paragraph>
			</Stack>
		);
	}

	if (meanings === "not found") {
		return (
			<Stack style={{ justifyContent: "center", height: "100%" }}>
				<Paragraph centered size="lg" color="gray">
					No definitions found, word is either misspelled, invalid, or it&apos;s a name
				</Paragraph>
			</Stack>
		);
	}

	const meaning = meanings[index];

	const onFirst = index === 0;
	const onLast = index >= meanings.length - 1;

	return (
		<Stack>
			<Stack
				direction="row"
				style={{
					padding: "1rem",
					paddingBottom: "0.75rem",
					justifyContent: "space-between",
					alignItems: "center"
				}}
			>
				<Paragraph>
					{meanings.length} meaning
					{meanings.length > 1 ? "s" : ""} found
				</Paragraph>

				<Stack direction="row" gap={2} style={{ alignItems: "center" }}>
					<Button disabled={onFirst} size="sm" onClick={toPreviousMeaning} square>
						<ChevronLeftIcon />
					</Button>
					<Paragraph size="lg" style={{ fontWeight: 700 }}>
						{index + 1}
					</Paragraph>
					<Button disabled={onLast} size="sm" onClick={toNextMeaning} square>
						<ChevronRightIcon />
					</Button>
				</Stack>
			</Stack>

			<Divider />

			<Stack
				style={{
					padding: "1rem",
					paddingTop: "0.75rem"
				}}
			>
				<Paragraph size="sm" color="gray">
					{meaning.partOfSpeech.toUpperCase()}
				</Paragraph>
				<Paragraph size="lg">{meaning.definition}</Paragraph>
			</Stack>
		</Stack>
	);
};
