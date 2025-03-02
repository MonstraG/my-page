import { type FC } from "react";
import type { Spell } from "@/components/spells/spellData/spells.types";
import styles from "./SpellDescription.module.css";

interface Props {
	spell: Spell;
}

export const SpellDescription: FC<Props> = ({ spell }) => (
	<div
		dangerouslySetInnerHTML={{ __html: spell.description }}
		className={styles.spellDescription}
	/>
);
