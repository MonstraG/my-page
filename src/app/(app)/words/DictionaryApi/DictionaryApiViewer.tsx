import type { FC } from "react";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Divider from "@mui/joy/Divider";
import type { Dictionary } from "@/app/(app)/words/DictionaryApi/DictionaryApi.types";

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
		return null;
	}

	if (meanings === "not found") {
		return (
			<Card>
				<Typography level="body-lg" textAlign="center">
					No definitions found, word is either misspelled, invalid, or it&apos;s a name
				</Typography>
			</Card>
		);
	}

	const meaning = meanings[index];

	const onFirst = index === 0;
	const onLast = index >= meanings.length - 1;

	return (
		<Card>
			<Stack justifyContent="space-between" direction="row" alignItems="center">
				<Typography level="body-md">
					{meanings.length} meaning
					{meanings.length > 1 ? "s" : ""} found
				</Typography>

				<Stack direction="row" gap={2}>
					<IconButton
						disabled={onFirst}
						variant="solid"
						size="sm"
						onClick={toPreviousMeaning}
					>
						<KeyboardArrowLeftIcon />
					</IconButton>
					<Typography level="h4" component="span">
						{index + 1}
					</Typography>
					<IconButton disabled={onLast} variant="solid" size="sm" onClick={toNextMeaning}>
						<KeyboardArrowRightIcon />
					</IconButton>
				</Stack>
			</Stack>

			<Divider />

			<Typography level="body-sm">{meaning.partOfSpeech.toUpperCase()}</Typography>
			<Typography level="body-lg">{meaning.definition}</Typography>
		</Card>
	);
};
