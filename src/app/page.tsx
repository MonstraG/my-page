import type { NextPage } from "next";
import styles from "./page.module.scss";
import { Open_Sans } from "next/font/google";
import { Contributions } from "@/components/Contributions/Contributions";
import { Profile } from "@/components/Profile/Profile";
import { DiceRoll } from "@/components/DiceRoll/DiceRoll";

const openSans = Open_Sans({ subsets: ["latin"] });

const IndexPage: NextPage = () => (
	<main className={openSans.className}>
		<div className={styles.container}>
			<Profile />
			<Contributions />
			<DiceRoll />
		</div>
	</main>
);

export default IndexPage;
