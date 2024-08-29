import type { Metadata, NextPage } from "next";
import { VocabularyTester } from "@/components/words/VocabularyTester";
import Container from "@mui/joy/Container";

export const metadata: Metadata = {
	title: "Vocabulary Tester"
};

const VocabularyTesterPage: NextPage = () => (
	<Container sx={{ py: 4 }}>
		<VocabularyTester />
	</Container>
);

export default VocabularyTesterPage;
