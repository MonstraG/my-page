import type { Dispatch, FC, SetStateAction } from "react";
import Card from "@mui/joy/Card";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Divider from "@mui/joy/Divider";
import type { DictionaryEntry } from "@/app/(app)/words/WordChecker";

export const emptyDictionary: Dictionary = { entries: null, entryIndex: 0, definitionIndex: 0 };

export interface Dictionary {
	entries: DictionaryEntry[] | null | { title: string; message: string; resolution: string };
	entryIndex: number;
	definitionIndex: number;
}

interface Props {
	dictionary: Dictionary;
	setDictionary: Dispatch<SetStateAction<Dictionary>>;
}

export const DictionaryEntries: FC<Props> = ({ dictionary, setDictionary }) => {
	if (dictionary.entries == null) {
		return null;
	}

	if (
		(Array.isArray(dictionary.entries) && dictionary.entries.length === 0) ||
		"title" in dictionary.entries
	) {
		return (
			<Card>
				<Typography level="body-lg" textAlign="center">
					No definitions found, word is either misspelled, invalid, or it&apos;s a name
				</Typography>
			</Card>
		);
	}

	const entry = dictionary.entries[dictionary.entryIndex];
	const meaning = entry.meanings[0]; // I did not yet found an entry that has multiple meanings

	return (
		<Card>
			<Stack justifyContent="space-between" direction="row" alignItems="center">
				<Typography level="body-md">
					{dictionary.entries.length} dictionary entr
					{dictionary.entries.length > 1 ? "ies" : "y"} found
				</Typography>

				<Stack direction="row" gap={2}>
					<IconButton
						disabled={dictionary.entryIndex === 0}
						variant="solid"
						size="sm"
						onClick={() => {
							setDictionary((prev) => ({
								...prev,
								entryIndex: prev.entryIndex - 1,
								definitionIndex: 0
							}));
						}}
					>
						<KeyboardArrowLeftIcon />
					</IconButton>
					<Typography level="h4" component="span">
						{dictionary.entryIndex + 1}
					</Typography>
					<IconButton
						disabled={dictionary.entryIndex >= dictionary.entries.length - 1}
						variant="solid"
						size="sm"
						onClick={() => {
							setDictionary((prev) => ({
								...prev,
								entryIndex: prev.entryIndex + 1,
								definitionIndex: 0
							}));
						}}
					>
						<KeyboardArrowRightIcon />
					</IconButton>
				</Stack>
			</Stack>

			<Divider />

			<Typography level="body-lg">
				({meaning.partOfSpeech}){" "}
				{meaning.definitions[dictionary.definitionIndex].definition}
			</Typography>

			{meaning.definitions.length > 1 && (
				<>
					<Divider />
					<Stack justifyContent="space-between" direction="row" alignItems="center">
						<Typography level="body-md">
							{entry.meanings.length} definitions in this entry
						</Typography>

						<Stack direction="row" gap={2}>
							<IconButton
								disabled={dictionary.definitionIndex === 0}
								variant="solid"
								size="sm"
								onClick={() => {
									setDictionary((prev) => ({
										...prev,
										definitionIndex: prev.definitionIndex - 1
									}));
								}}
							>
								<KeyboardArrowLeftIcon />
							</IconButton>
							<Typography level="h4" component="span">
								{dictionary.definitionIndex + 1}
							</Typography>
							<IconButton
								disabled={
									dictionary.definitionIndex >= meaning.definitions.length - 1
								}
								variant="solid"
								size="sm"
								onClick={() => {
									setDictionary((prev) => ({
										...prev,
										definitionIndex: prev.definitionIndex + 1
									}));
								}}
							>
								<KeyboardArrowRightIcon />
							</IconButton>
						</Stack>
					</Stack>
				</>
			)}
		</Card>
	);
};
