"use client";
import { type FC, useState } from "react";
import styles from "@/components/DiceRoll/DiceRoll.module.scss";
import { Distribution } from "@/components/DiceRoll/Distribution";

export const DiceRoll: FC = () => {
	const [dices, setDices] = useState<number>(1);
	const [sides, setSides] = useState<number>(1);

	return (
		<div>
			<input
				type="number"
				placeholder="Dice amount"
				min={2}
				max={10}
				value={dices}
				onChange={(e) => {
					setDices(parseInt(e.target.value));
				}}
			/>
			d
			<input
				type="number"
				placeholder="Sides"
				min={1}
				max={10}
				value={sides}
				onChange={(e) => {
					setSides(parseInt(e.target.value));
				}}
			/>
			<div className={styles.row}>
				<Distribution dices={dices} sides={sides} />
			</div>
		</div>
	);
};
