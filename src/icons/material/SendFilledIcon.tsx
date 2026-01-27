import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const SendFilledIcon: SvgIcon = (props) => (
	<Icon {...props} title="Send">
		<path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z" />
	</Icon>
);
