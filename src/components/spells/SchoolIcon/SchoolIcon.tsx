import type { DndSchool, Spell } from "@/components/spells/spellData/spells.types";
import { AbjurationIcon } from "@/icons/dnd/AbjurationIcon";
import { ConjurationIcon } from "@/icons/dnd/ConjurationIcon";
import { DivinationIcon } from "@/icons/dnd/DivinationIcon";
import { EnchantmentIcon } from "@/icons/dnd/EnchantmentIcon";
import { EvocationIcon } from "@/icons/dnd/EvocationIcon";
import { IllusionIcon } from "@/icons/dnd/IllusionIcon";
import { NecromancyIcon } from "@/icons/dnd/NecromancyIcon";
import { TransmutationIcon } from "@/icons/dnd/TransmutationIcon";
import { clsx } from "clsx";
import type { FC, ReactElement } from "react";
import styles from "./SchoolIcon.module.css";

const schoolIcons: Record<DndSchool, ReactElement> = {
	Abjuration: <AbjurationIcon className={clsx(styles.icon, styles.abjuration)} />,
	Conjuration: <ConjurationIcon className={clsx(styles.icon, styles.conjuration)} />,
	Divination: <DivinationIcon className={clsx(styles.icon, styles.divination)} />,
	Enchantment: <EnchantmentIcon className={clsx(styles.icon, styles.enchantment)} />,
	Evocation: <EvocationIcon className={clsx(styles.icon, styles.evocation)} />,
	Illusion: <IllusionIcon className={clsx(styles.icon, styles.illusion)} />,
	Necromancy: <NecromancyIcon className={clsx(styles.icon, styles.necromancy)} />,
	Transmutation: <TransmutationIcon className={clsx(styles.icon, styles.transmutation)} />,
};

interface Props {
	spell: Spell;
}

export const SchoolIcon: FC<Props> = ({ spell }) => schoolIcons[spell.school];
