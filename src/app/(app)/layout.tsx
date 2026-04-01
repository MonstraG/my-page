import type { FCC } from "@/types/react";
import "@/ui/reset.css";
import "@/ui/global.css";
import { SnackbarHost } from "@/components/snack/Snackbars";

const AppLayout: FCC = ({ children }) => (
	<>
		{children}
		<SnackbarHost />
	</>
);

export default AppLayout;
