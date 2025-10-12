import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const AddIcon: SvgIcon = (props) => (
	<Icon {...props} viewBox="0 0 480 480" title="Add">
		<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
	</Icon>
);
