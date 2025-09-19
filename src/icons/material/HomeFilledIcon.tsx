import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const HomeFilledIcon: SvgIcon = (props) => (
	<Icon {...props} title="Home">
		<path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
	</Icon>
);
