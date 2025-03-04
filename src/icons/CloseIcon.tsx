import type { FC, SVGProps } from "react";
import { Icon } from "@/ui/Icon/Icon";

export const CloseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props}>
		<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
	</Icon>
);
