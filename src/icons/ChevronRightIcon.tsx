import type { FC, SVGProps } from "react";
import { Icon } from "@/ui/Icon/Icon";

export const ChevronRightIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props}>
		<path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
	</Icon>
);
