import { Open_Sans } from "next/font/google";
import type { FCC } from "@/types/react";
import { MediaToggleButton } from "@/app/(app)/MediaToggleButton";

const openSans = Open_Sans({ subsets: ["latin"] });

const AppLayout: FCC = ({ children }) => (
	<main className={openSans.className}>
		<MediaToggleButton />
		{children}
	</main>
);

export default AppLayout;
