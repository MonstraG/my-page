import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const ChevronLeftIcon: SvgIcon = (props) => (
	<Icon {...props} title="Left">
		<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
	</Icon>
);
