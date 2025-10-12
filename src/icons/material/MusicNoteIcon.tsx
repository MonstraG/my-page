import type { SvgIcon } from "@/icons/icon.type";
import { Icon } from "@/ui/Icon/Icon";

export const MusicNoteIcon: SvgIcon = (props) => (
	<Icon {...props} viewBox="0 0 480 480" title="Delete">
		<path d="M400-120q-66 0-113-47t-47-113q0-66 47-113t113-47q23 0 43 6t37 16v-422h240v160H560v400q0 66-47 113t-113 47Z" />
	</Icon>
);
