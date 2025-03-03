import type { FC } from "react";
import { Button } from "@/ui/Button/Button";
import { type FavoriteSpellsActions } from "@/components/spells/favouriteSpellsStore";
import { FavoriteIcon } from "@/icons/FavoriteIcon";
import { FavoriteFilledIcon } from "@/icons/FavoriteFilledIcon";

interface Props {
	spellId: number;
	isFavorite: boolean;
	toggleFavorite: FavoriteSpellsActions["toggleSpell"];
}

export const FavoriteButton: FC<Props> = ({ spellId, isFavorite, toggleFavorite }) => (
	<Button
		size="sm"
		square
		color="neutral"
		variant="plain"
		onClick={() => toggleFavorite(spellId, isFavorite)}
	>
		{isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
	</Button>
);
