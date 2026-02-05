"use client";
import { Button } from "@/ui/Button/Button.tsx";
import type { FC } from "react";
import { snack } from "@/components/snack/snack.ts";
import { Popover } from "@/ui/Popover/Popover.tsx";
import { usePopoverControl } from "@/ui/Popover/usePopoverControl.ts";

export const SnackButtonTester: FC = () => {
	const popoverControl = usePopoverControl();

	return (
		<>
			<Button
				style={{ alignSelf: "start" }}
				onClick={() => snack("normal", "Hello world!")}
				onContextMenu={(event) => {
					event.preventDefault();
					popoverControl.handleOpen(event, undefined);
				}}
			>
				Open snack!
			</Button>
			<Popover
				anchor={popoverControl.anchor}
				isOpen={popoverControl.isOpen}
				close={popoverControl.handleClose}
			>
				<div>hehe</div>
			</Popover>
		</>
	);
};
