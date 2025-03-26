import type { FC, ReactNode } from "react";

interface Props {
	name: ReactNode;
	value: ReactNode;
}

export const SpellPropertyListItem: FC<Props> = ({ name, value }) => (
	<li>
		<span>
			<strong>{name}:</strong> {value}
		</span>
	</li>
);
