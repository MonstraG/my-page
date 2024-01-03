import type { FC, ReactNode } from "react";
import ListItem from "@mui/joy/ListItem";

interface Props {
	name: ReactNode;
	value: ReactNode;
}

export const SpellPropertyListItem: FC<Props> = ({ name, value }) => (
	<ListItem sx={{ px: 0 }}>
		<span>
			<strong>{name}:</strong> {value}
		</span>
	</ListItem>
);
