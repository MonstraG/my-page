import { Icon } from "@/ui/Icon/Icon";
import type { FC, SVGProps } from "react";

export const MenuIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props}>
		<path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
	</Icon>
);
