import { FC, useEffect, useState } from "react";
import styles from "@/components/DiceRoll/TryRoll.module.scss";

function getRandomIntInclusive(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Props {
	dice: number[];
}

export const TryRoll: FC<Props> = ({ dice }) => {
	const [result, setResult] = useState<number | null>(null);
	useEffect(() => {
		setResult(null);
	}, [dice]);

	if (dice.length === 0) return null;

	return (
		<div className={styles.stack}>
			<button
				className={styles.rollButton}
				onClick={() => {
					setResult(dice.reduce((acc, next) => acc + getRandomIntInclusive(1, next), 0));
				}}
			>
				Try rolling!
			</button>
			{result && (
				<>
					<h3>Your result:</h3>
					<span className={styles.rollResult}>{result}</span>
				</>
			)}
		</div>
	);
};
