import { Divider } from "@/ui/Divider/Divider";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import type { FC, ReactNode } from "react";
import styles from "./BidirectionalCard.module.css";

interface Props {
	slots: {
		left: ReactNode;
		right: ReactNode;
	};
}

export const BidirectionalCard: FC<Props> = ({ slots }) => (
	<Sheet style={{ padding: 0 }}>
		<Stack className={styles.card}>
			{slots.left}
			<Divider />
			{slots.right}
		</Stack>
	</Sheet>
);
