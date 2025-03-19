import type { FCC } from "@/types/react";
import "@/ui/reset.css";
import "@/ui/global.css";
import { NavLayout } from "@/components/nav/NavLayout/NavLayout";
import { SnackbarHost } from "@/components/SnackbarHost";

const AppLayout: FCC = ({ children }) => (
	<>
		<NavLayout>{children}</NavLayout>
		<SnackbarHost />
	</>
);

export default AppLayout;
