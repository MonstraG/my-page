import { NextPage } from "next";
import styles from "./page.module.scss";
import { Open_Sans } from "next/font/google";
import { Contributions } from "@/components/Contributions";

const openSans = Open_Sans({ subsets: ["latin"] });

const IndexPage: NextPage = () => (
	<main className={openSans.className}>
		<div className={styles.container}>
			<h1>Arseny Garelyshev</h1>
			<Contributions />
		</div>
	</main>
);

export default IndexPage;
