import type { CSSProperties, FC, SVGProps } from "react";
import { Icon } from "@/ui/Icon/Icon";

// need to override general rule of fill: currentColor
const d20IconStyles: CSSProperties = {
	fill: "none"
};

export const D20Icon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon
		{...props}
		viewBox="0 0 24 24"
		stroke="currentColor"
		fill="none"
		strokeLinejoin="round"
		strokeWidth="1.5"
		style={d20IconStyles}
	>
		<path d="m11.95 2.25-8.7 4.67.28 9.83 8.27 5 8.37-5.06.58-9.64z" />
		<path d="m3.26 6.93 8.62-.96 8.87 1.09M3.54 16.75l2.8-1.55 10.86-.08 2.98 1.57" />
		<path d="m3.25 6.92 3.1 8.28 5.53-9.23 5.33 9.15 3.53-8.06m-8.78-4.82-.08 3.72M6.33 15.2l5.47 6.55 5.39-6.63" />
	</Icon>
);
