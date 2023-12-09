import type { FCC } from "@/types/react";
import { MediaToggleButton } from "@/components/MediaToggleButton";
import { ThemeRegistry } from "@/app/(app)/ThemeRegistry";
import { SnackbarHost } from "@/components/SnackbarHost";

const AppLayout: FCC = ({ children }) => (
	<ThemeRegistry options={{ key: "joy" }}>
		<main>{children}</main>
		<MediaToggleButton />
		<SnackbarHost />
	</ThemeRegistry>
);

export default AppLayout;
