import { Icon } from "@/ui/Icon/Icon";
import type { FC, SVGProps } from "react";

export const NorthIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props}>
		<path d="M440-80v-647L256-544l-56-56 280-280 280 280-56 57-184-184v647h-80Z" />
	</Icon>
);
