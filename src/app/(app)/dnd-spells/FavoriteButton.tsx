import type { FC } from "react";
import IconButton from "@mui/joy/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { create } from "zustand";
import type { Spell } from "@/app/(app)/dnd-spells/spells/spells.types";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { devtools, persist } from "zustand/middleware";

export const useFavoritesStore = create<{ favorites: Spell["id"][] }>()(
	devtools(
		persist(
			() => ({
				favorites: [] as number[]
			}),
			{
				name: "dnd-spells-favorites"
			}
		)
	)
);

type Props = {
	spellId: number;
	isFavorite: boolean;
};

export const FavoriteButton: FC<Props> = ({ spellId, isFavorite }) => (
	<IconButton
		aria-label={isFavorite ? "Unfavorite" : "Favorite"}
		size="sm"
		variant="plain"
		color="neutral"
		onClick={() =>
			useFavoritesStore.setState((prev) => {
				if (isFavorite) {
					return {
						favorites: prev.favorites.filter((sId) => sId != spellId)
					};
				}
				return {
					favorites: [...prev.favorites, spellId]
				};
			})
		}
	>
		{isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
	</IconButton>
);
