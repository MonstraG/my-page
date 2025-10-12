import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const FolderIcon: SvgIcon = (props) => (
	<Icon {...props} viewBox="0 0 480 480" title="Delete">
		<path d="M160-160q-33 0-56-23t-24-57v-480q0-33 24-56t56-24h240l80 80h320q33 0 57 24t23 56v400q0 33-23 57t-57 23H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z" />
	</Icon>
);
