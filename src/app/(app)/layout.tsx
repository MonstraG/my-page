import type { FCC } from "@/types/react";
import { ThemeRegistry } from "@/components/theme/ThemeRegistry";
import "@/ui/reset.css";
import "@/ui/global.css";
import { SnackbarHost } from "@/components/SnackbarHost";
import { NavLayout } from "@/components/nav/NavLayout/NavLayout";

const AppLayout: FCC = ({ children }) => (
	<ThemeRegistry>
		<NavLayout>{children}</NavLayout>
		<SnackbarHost />
	</ThemeRegistry>
);

export default AppLayout;
