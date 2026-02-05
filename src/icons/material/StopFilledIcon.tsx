import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const StopFilledIcon: SvgIcon = (props) => (
	<Icon {...props} title="Stop">
		<path d="M240-240v-480h480v480H240Z" />
	</Icon>
);
