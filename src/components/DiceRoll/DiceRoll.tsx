"use client";
import { type FC, useState } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";
import { Distribution } from "@/components/DiceRoll/Distribution";

export const DiceRoll: FC = () => {
	const [dices, setDices] = useState<number>(1);
	const [rolls, setRolls] = useState<number>(1);

	return (
		<div>
			<input
				type="number"
				placeholder="dices"
				min={1}
				max={10}
				value={dices}
				onChange={(e) => {
					setDices(parseInt(e.target.value));
				}}
			/>
			d
			<input
				type="number"
				placeholder="rolls"
				min={1}
				max={10}
				value={rolls}
				onChange={(e) => {
					setRolls(parseInt(e.target.value));
				}}
			/>
			<div className={styles.row}>
				<Distribution dices={dices} rolls={rolls} />
			</div>
		</div>
	);
};
