import type { FCC } from "@/types/react";
import { NavigationLayout } from "@/components/nav/NavigationLayout";
import { ThemeRegistry } from "@/components/theme/ThemeRegistry";

const AppLayout: FCC = ({ children }) => (
	<ThemeRegistry>
		<NavigationLayout>{children}</NavigationLayout>
	</ThemeRegistry>
);

export default AppLayout;
