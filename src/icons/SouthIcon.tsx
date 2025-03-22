import { Icon } from "@/ui/Icon/Icon";
import type { FC, SVGProps } from "react";

export const SouthIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props}>
		<path d="M480-80 200-360l56-56 184 183v-647h80v647l184-184 56 57L480-80Z" />
	</Icon>
);
