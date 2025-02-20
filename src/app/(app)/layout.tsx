import type { FCC } from "@/types/react";
import "@/ui/reset.css";
import "@/ui/global.css";
import { SnackbarHost } from "@/components/SnackbarHost";
import { NavLayout } from "@/components/nav/NavLayout/NavLayout";

const AppLayout: FCC = ({ children }) => (
	<>
		<NavLayout>{children}</NavLayout>
		<SnackbarHost />
	</>
);

export default AppLayout;
