import { FavoriteFilledIcon } from "@/icons/material/FavoriteFilledIcon";
import { FavoriteIcon } from "@/icons/material/FavoriteIcon";
import { Button } from "@/ui/Button/Button";
import { Tooltip, type TooltipProps } from "@/ui/Tooltip/Tooltip";
import type { FC } from "react";
import type { Spell } from "@/components/spells/spellData/spells.types.ts";

interface Props {
	spellId: number;
	isFavorite: boolean;
	toggleFavorite: (SpellId: Spell["id"]) => void;
	tooltipPlacement?: TooltipProps["placement"];
}

export const FavoriteButton: FC<Props> = ({
	spellId,
	isFavorite,
	toggleFavorite,
	tooltipPlacement,
}) => {
	const title = isFavorite ? "Unfavorite" : "Favorite";

	return (
		<Tooltip title={title} placement={tooltipPlacement}>
			<Button
				size="sm"
				square
				color="neutral"
				variant="plain"
				aria-label={title}
				onClick={() => toggleFavorite(spellId)}
			>
				{isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
			</Button>
		</Tooltip>
	);
};
