import type { NextPage } from "next";
import { getAllWords } from "@/app/(app)/words/getAllWords";
import { WordChecker } from "@/app/(app)/words/WordChecker";
import Container from "@mui/joy/Container";

const WordsPage: NextPage = async () => {
	const allWords = await getAllWords();

	return (
		<Container sx={{ py: 4 }}>
			<WordChecker allWords={allWords} />
		</Container>
	);
};

export default WordsPage;
