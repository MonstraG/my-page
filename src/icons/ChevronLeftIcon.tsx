import { Icon } from "@/ui/Icon/Icon";
import type { FC, SVGProps } from "react";

export const ChevronLeftIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props}>
		<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
	</Icon>
);
