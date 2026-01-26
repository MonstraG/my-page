import type { FCC } from "@/types/react";
import "@/ui/reset.css";
import "@/ui/global.css";
import { NavLayout } from "@/components/nav/NavLayout/NavLayout";
import { SnackbarContextProvider } from "@/components/snack/Snackbars.tsx";

const AppLayout: FCC = ({ children }) => (
	<SnackbarContextProvider>
		<NavLayout>{children}</NavLayout>
	</SnackbarContextProvider>
);

export default AppLayout;
