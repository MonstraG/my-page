import type { FC, ReactNode } from "react";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import { Divider } from "@/ui/Divider/Divider";

interface Props {
	slots: {
		left: ReactNode;
		right: ReactNode;
	};
}

export const BidirectionalCard: FC<Props> = ({ slots }) => (
	<Sheet style={{ padding: 0 }}>
		<Stack className="mobile-column desktop-row">
			{slots.left}
			<Divider />
			{slots.right}
		</Stack>
	</Sheet>
);
