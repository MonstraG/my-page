import type { FC } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button } from "@/ui/Button/Button";
import { type FavoriteSpellsActions } from "@/components/spells/favouriteSpellsStore";

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
		{isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
	</Button>
);
