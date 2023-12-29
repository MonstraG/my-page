import type { FCC } from "@/types/react";
import { ThemeRegistry } from "@/app/(app)/ThemeRegistry";
import { NavigationLayout } from "@/app/(app)/NavigationLayout";

const AppLayout: FCC = ({ children }) => (
	<ThemeRegistry options={{ key: "joy" }}>
		<NavigationLayout>{children}</NavigationLayout>
	</ThemeRegistry>
);

export default AppLayout;
