import type { FCC } from "@/types/react";
import { MediaToggleButton } from "@/app/(app)/MediaToggleButton";
import { ThemeRegistry } from "@/app/(app)/ThemeRegistry";

const AppLayout: FCC = ({ children }) => (
	<ThemeRegistry options={{ key: "joy" }}>
		<main>{children}</main>
		<MediaToggleButton />
	</ThemeRegistry>
);

export default AppLayout;
