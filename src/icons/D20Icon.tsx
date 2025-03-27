import { Icon } from "@/ui/Icon/Icon";
import type { FC, SVGProps } from "react";

export const D20Icon: FC<SVGProps<SVGSVGElement>> = (props) => (
	<Icon {...props} viewBox="0 0 480 480">
		<path d="m239 40-7 2-165 89c-5 2-8 7-8 13l5 187c1 5 3 9 7 12l158 95 7 2 8-2 159-96c4-3 7-7 7-12l11-183c0-6-3-11-7-14L246 42l-7-2zm14 38 82 45-83-10zm-29 0v34l-79 9zm-13 65-76 125-42-112Zm54 0 121 15-49 110zm-27 10 76 132-156 1zm150 72-5 81-25-13zm-298 4 25 65-23 13zm219 85-73 89-74-88zm34 3 24 13-68 41zm-214 2 41 50-63-38z" />
	</Icon>
);
