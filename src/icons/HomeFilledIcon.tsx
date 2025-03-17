import type { FC, SVGProps } from "react";
import { Icon } from "@/ui/Icon/Icon";

export const HomeFilledIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props}>
		<path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
	</Icon>
);
