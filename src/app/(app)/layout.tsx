import type { FCC } from "@/types/react";
import { NavigationLayout } from "@/components/Nav/NavigationLayout";
import { ThemeRegistry } from "@/components/ThemeRegistry/ThemeRegistry";
import { setHtmlLangHack } from "@/app/evilHtmlLangHack";

const AppLayout: FCC = ({ children }) => {
	setHtmlLangHack("en");
	return (
		<ThemeRegistry>
			<NavigationLayout>{children}</NavigationLayout>
		</ThemeRegistry>
	);
};

export default AppLayout;
