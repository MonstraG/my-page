import type { FC, ReactNode } from "react";

interface Props {
	name: ReactNode;
	value: ReactNode;
}

export const SpellPropertyListItem: FC<Props> = ({ name, value }) => (
	<li style={{ fontSize: "0.875rem" }}>
		<span>
			<strong>{name}:</strong> {value}
		</span>
	</li>
);
