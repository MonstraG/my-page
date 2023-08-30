import { Open_Sans } from "next/font/google";
import type { FCC } from "@/types/react";
import styles from "@/app/(app)/about/page.module.scss";

const openSans = Open_Sans({ subsets: ["latin"] });

const AppLayout: FCC = ({ children }) => (
	<main className={openSans.className}>
		<div className={styles.container}>{children}</div>
	</main>
);

export default AppLayout;
