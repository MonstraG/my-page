import type { FC, SVGProps } from "react";

export interface SvgIconPropsInternal extends SVGProps<SVGSVGElement> {
	title: string;
}

export interface SvgIconProps extends SVGProps<SVGSVGElement> {}

export type SvgIcon = FC<SvgIconProps>;
