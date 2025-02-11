import type { FCC } from "@/types/react";
import { NavigationLayout } from "@/components/nav/NavigationLayout";
import { ThemeRegistry } from "@/components/theme/ThemeRegistry";
import "@/ui/reset.css";
import "@/ui/global.css";

const AppLayout: FCC = ({ children }) => (
	<ThemeRegistry>
		<NavigationLayout>{children}</NavigationLayout>
	</ThemeRegistry>
);

export default AppLayout;
