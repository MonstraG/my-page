import type { FCC } from "@/types/react";
import { MediaToggleButton } from "@/app/(app)/MediaToggleButton";
import { ThemeRegistry } from "@/app/(app)/ThemeRegistry";
import { SnackbarHost } from "@/app/(app)/diagrams/SnackbarHost";

const AppLayout: FCC = ({ children }) => (
	<ThemeRegistry options={{ key: "joy" }}>
		<main>{children}</main>
		<MediaToggleButton />
		<SnackbarHost />
	</ThemeRegistry>
);

export default AppLayout;
