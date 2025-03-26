import type { Spell } from "@/components/spells/spellData/spells.types";
import { type FC } from "react";
import styles from "./SpellDescription.module.css";

interface Props {
	spell: Spell;
}

export const SpellDescription: FC<Props> = ({ spell }) => (
	<>
		<div>
			<h6>Description</h6>
			<p
				dangerouslySetInnerHTML={{ __html: spell.description }}
				className={styles.spellDescription}
			/>
		</div>
		{spell.onHigherLevels && (
			<div>
				<h6>When upcast:</h6>
				<p
					dangerouslySetInnerHTML={{ __html: spell.onHigherLevels }}
					className={styles.spellDescription}
				/>
			</div>
		)}
	</>
);
