"use client";
import type { FC } from "react";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { useTooltipController } from "@/components/Tooltip/useTooltipController";
import { InfoIcon } from "@/components/InfoIcon/InfoIcon";
import type { MouseEvent } from "react";

export const ContributionsTableTooltip: FC = () => {
	const tooltip = useTooltipController<unknown>();

	return (
		<>
			<InfoIcon
				onMouseEnter={(event: MouseEvent<HTMLDivElement>) => {
					tooltip.controls.open(event.currentTarget, null);
				}}
				onMouseLeave={tooltip.controls.close}
			/>

			<Tooltip tooltip={tooltip}>
				Fetches data from github, re-implemented from scratch.
				<div>And maybe it should have been a table.</div>
			</Tooltip>
		</>
	);
};
