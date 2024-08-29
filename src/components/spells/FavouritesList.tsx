import type { Dispatch, FC, SetStateAction } from "react";
import List from "@mui/joy/List";
import { SpellListItem } from "@/components/spells/SpellListItem";
import { FavoriteButton } from "@/components/spells/FavoriteButton";
import type { Spell } from "@/components/spells/spellData/spells.types";

interface Props {
	spells: Spell[];
	setDialogSpell: Dispatch<SetStateAction<Spell | null>>;
	isFavourite: boolean;
}

export const SpellList: FC<Props> = ({ spells, setDialogSpell, isFavourite }) => (
	<List>
		{spells.map((spell) => (
			<SpellListItem
				key={spell.id}
				spell={spell}
				onClick={setDialogSpell}
				endAction={<FavoriteButton spellId={spell.id} isFavorite={isFavourite} />}
			/>
		))}
	</List>
);
