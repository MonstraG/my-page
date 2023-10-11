import { FC, useEffect, useState } from "react";
import styles from "@/components/DiceRoll/TryRoll.module.scss";

function getRandomIntInclusive(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface Props {
	dice: number[];
}

export const TryRoll: FC<Props> = ({ dice }) => {
	const [results, setResults] = useState<number[]>([]);
	useEffect(() => {
		setResults([]);
	}, [dice]);

	if (dice.length === 0) return null;

	return (
		<section className={styles.stack}>
			<h2>Try rolling</h2>
			<button
				className={styles.rollButton}
				onClick={() => {
					const newRoll = dice.reduce(
						(acc, next) => acc + getRandomIntInclusive(1, next),
						0
					);
					setResults((prev) => [...prev, newRoll]);
				}}
			>
				Try rolling!
			</button>
			{results.length > 0 && (
				<>
					<h3>Your rolls:</h3>
					<ul>
						{results.map((roll, index) => {
							return <li key={index}>{roll}</li>;
						})}
					</ul>
				</>
			)}
		</section>
	);
};
