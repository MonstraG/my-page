import type { FCC } from "@/types/react";
import { ThemeRegistry } from "@/components/ThemeRegistry/ThemeRegistry";
import { setHtmlLangHack } from "@/app/evilHtmlLangHack";

const BooksLayout: FCC = ({ children }) => {
	setHtmlLangHack("ru");
	return <ThemeRegistry>{children}</ThemeRegistry>;
};

export default BooksLayout;
