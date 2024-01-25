import type { NextPage } from "next";
import { WordChecker } from "@/app/(app)/words/WordChecker";
import Container from "@mui/joy/Container";

const WordsPage: NextPage = () => (
	<Container sx={{ py: 4 }}>
		<WordChecker />
	</Container>
);

export default WordsPage;
