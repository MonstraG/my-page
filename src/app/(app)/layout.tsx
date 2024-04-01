import type { FCC } from "@/types/react";
import { NavigationLayout } from "@/app/(app)/NavigationLayout";
import { ThemeRegistry } from "@/app/(app)/ThemeRegistry/ThemeRegistry";

const AppLayout: FCC = ({ children }) => (
	<html lang="en">
		<body>
			<ThemeRegistry>
				<NavigationLayout>{children}</NavigationLayout>
			</ThemeRegistry>
		</body>
	</html>
);

export default AppLayout;
