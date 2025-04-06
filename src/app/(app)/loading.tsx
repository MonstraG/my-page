import { Spinner } from "@/ui/Spinner/Spinner";
import type { FC } from "react";

const Loading: FC = () => (
	<Spinner
		size={5}
		style={{
			// don't want to put display: flex on main
			position: "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
		}}
	/>
);

export default Loading;
