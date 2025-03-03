import type { FC } from "react";
import { Button } from "@/ui/Button/Button";
import { type FavoriteSpellsActions } from "@/components/spells/favouriteSpellsStore";
import { FavoriteIcon } from "@/icons/FavoriteIcon";
import { FavoriteFilledIcon } from "@/icons/FavoriteFilledIcon";
import { Tooltip, type TooltipProps } from "@/ui/Tooltip/Tooltip";

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
	tooltipPlacement
}) => (
	<Tooltip title={isFavorite ? "Unfavorite" : "Favorite"} placement={tooltipPlacement}>
		<Button
			size="sm"
			square
			color="neutral"
			variant="plain"
			onClick={() => toggleFavorite(spellId, isFavorite)}
		>
			{isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
		</Button>
	</Tooltip>
);
