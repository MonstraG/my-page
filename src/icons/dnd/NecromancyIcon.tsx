import { Icon } from "@/ui/Icon/Icon";
import type { FC, SVGProps } from "react";

export const TransmutationIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props} viewBox="0 0 480 480">
		<path d="M240 128c-50 0-114 22-127 64-15 49 39 93 15 117-12 11-24 11-35 5-11-7-20-21-18-42a17 17 0 1 0-34-2 77 77 0 0 0 35 73c23 14 54 12 76-10 43-43-15-101-6-131 15-51 173-50 188 0 9 30-49 88-6 131a63 63 0 0 0 76 10 77 77 0 0 0 35-73 17 17 0 1 0-34 2c2 21-7 35-18 42-11 6-23 6-35-5-24-24 30-68 15-117-13-42-77-64-127-64z" />
	</Icon>
);
