import type { FC } from "react";
import type { TooltipController } from "@/components/Tooltip/useTooltipController";
import type { ContributionDayParsed } from "@/components/Github/Contributions/getContributions";
import { Tooltip } from "@/components/Tooltip/Tooltip";

const formatDate: Intl.DateTimeFormatOptions = {
	day: "numeric",
	month: "numeric",
	year: "numeric"
};

function tooltipText(tooltipContext: ContributionDayParsed | null, language: string) {
	const date = tooltipContext?.date.toLocaleString(language, formatDate);
	const count = tooltipContext?.contributionCount ?? 0;

	if (count === 0) {
		return `There were no contributions made on ${date}`;
	}
	if (count === 1) {
		return `There was one contribution made on ${date}`;
	}
	return `There were ${count} contributions made on ${date}`;
}

interface Props {
	tooltip: TooltipController<ContributionDayParsed>;
	language: string;
}

export const ContributionTooltip: FC<Props> = ({ tooltip, language }) => (
	<Tooltip tooltip={tooltip}>{tooltipText(tooltip.context, language)}</Tooltip>
);
