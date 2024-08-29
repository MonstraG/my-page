import type { Metadata, NextPage } from "next";
import { DiceRolling } from "@/components/DiceRoll/DiceRolling";

export const metadata: Metadata = {
	title: "Dice rolling"
};

const IndexPage: NextPage = () => {
	return <DiceRolling />;
};

export default IndexPage;
