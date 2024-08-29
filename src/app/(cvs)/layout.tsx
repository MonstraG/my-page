import type { FCC } from "@/types/react";
import { setHtmlLangHack } from "@/app/evilHtmlLangHack";

const CvsLayout: FCC = ({ children }) => {
	setHtmlLangHack("en");
	return children;
};

export default CvsLayout;
