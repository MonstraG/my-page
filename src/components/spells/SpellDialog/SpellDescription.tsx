import type { Spell } from "@/components/spells/spellData/spells.types";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import type { FC } from "react";
import styles from "./SpellDescription.module.css";

interface Props {
	spell: Spell;
}

export const SpellDescription: FC<Props> = ({ spell }) => (
	<>
		<div>
			<h4>Description</h4>
			<Paragraph
				dangerouslySetInnerHTML={{ __html: spell.description }}
				className={styles.spellDescription}
			/>
		</div>
		{spell.onHigherLevels && (
			<div>
				<h4>On higher levels:</h4>
				<Paragraph
					dangerouslySetInnerHTML={{ __html: spell.onHigherLevels }}
					className={styles.spellDescription}
				/>
			</div>
		)}
		<Paragraph size="sm">
			<i>{spell.source}</i>
		</Paragraph>
	</>
);
