import type { FCC } from "@/types/react";
import { evilHtmlLangHack } from "@/app/evilHtmlLangHack";

const RootLayout: FCC = ({ children }) => (
	<html lang={evilHtmlLangHack.lang}>
		<body>{children}</body>
	</html>
);

export default RootLayout;
