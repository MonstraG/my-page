import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const SouthIcon: SvgIcon = (props) => (
	<Icon {...props} title="South">
		<path d="M480-80 200-360l56-56 184 183v-647h80v647l184-184 56 57L480-80Z" />
	</Icon>
);
