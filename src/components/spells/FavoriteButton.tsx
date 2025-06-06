import { type FavoriteSpellsActions } from "@/components/spells/favouriteSpellsStore";
import { FavoriteFilledIcon } from "@/icons/material/FavoriteFilledIcon";
import { FavoriteIcon } from "@/icons/material/FavoriteIcon";
import { Button } from "@/ui/Button/Button";
import { Tooltip, type TooltipProps } from "@/ui/Tooltip/Tooltip";
import type { FC } from "react";

interface Props {
	spellId: number;
	isFavorite: boolean;
	toggleFavorite: FavoriteSpellsActions["toggleSpell"];
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
				onClick={() => toggleFavorite(spellId, isFavorite)}
			>
				{isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
			</Button>
		</Tooltip>
	);
};
