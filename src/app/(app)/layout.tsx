import type { FCC } from "@/types/react";
import { NavigationLayout } from "@/components/nav/NavigationLayout";
import { ThemeRegistry } from "@/components/theme/ThemeRegistry";
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
