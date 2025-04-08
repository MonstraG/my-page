import type { FCC } from "@/types/react";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";

export const VideoAppIntroCard: FCC = ({ children }) => (
	<Stack
		style={{
			minHeight: "100vh",
			justifyContent: "center",
			alignItems: "center",
			textAlign: "center",
		}}
	>
		<Sheet style={{ padding: "3rem" }}>{children}</Sheet>
	</Stack>
);
