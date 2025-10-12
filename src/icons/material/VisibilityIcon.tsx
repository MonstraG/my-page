import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const VisibilityIcon: SvgIcon = (props) => (
	<Icon {...props} viewBox="0 0 480 480" title="Delete">
		<path d="M480-320q75 0 128-52t52-128q0-75-52-127t-128-53q-75 0-127 53t-53 127q0 75 53 128t127 52Zm0-72q-45 0-76-31t-32-77q0-45 32-76t76-32q45 0 77 32t31 76q0 45-31 77t-77 31Zm0 192q-146 0-266-81T40-500q54-137 174-218t266-82q146 0 266 82t174 218q-54 137-174 219t-266 81Zm0-300Zm0 220q113 0 208-59t144-161q-50-101-144-160t-208-60q-113 0-207 60T128-500q50 101 145 161t207 59Z" />
	</Icon>
);
