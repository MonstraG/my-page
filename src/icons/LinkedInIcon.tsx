import { Icon } from "@/ui/Icon/Icon";
import type { FC, SVGProps } from "react";

export const LinkedInIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props} viewBox="0 0 24 24">
		<path d="M20.48 2.05H3.52c-.76 0-1.43.66-1.52 1.43v17.14c0 .76.66 1.43 1.52 1.43h16.96c.76 0 1.43-.67 1.52-1.43V3.48c0-.77-.66-1.43-1.52-1.43ZM7.98 19.1H5.02V9.57h2.94ZM6.44 8.24a1.7 1.7 0 0 1-1.7-1.72 1.7 1.7 0 1 1 3.41 0 1.7 1.7 0 0 1-1.7 1.72zM19.06 19.1h-2.94v-4.67c0-1.14 0-2.57-1.51-2.57-1.52 0-1.8 1.24-1.8 2.47v4.77H9.87V9.57h2.84v1.33a2.99 2.99 0 0 1 2.75-1.52c3.03 0 3.5 2 3.5 4.57z" />
	</Icon>
);
