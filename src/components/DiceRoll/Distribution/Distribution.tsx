import { diceArrayToRecord } from "@/components/DiceRoll/Distribution/distribution";
import { DistributionChart } from "@/components/DiceRoll/Distribution/DistributionChart";
import { getDistribution } from "@/components/DiceRoll/Distribution/getDistribution";
import { rollFunctions, type RollMode } from "@/components/DiceRoll/Distribution/rolls";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { Button } from "@/ui/Button/Button";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import { type Dispatch, type FC, type SetStateAction } from "react";
import styles from "./Distribution.module.css";

export function getDistributionAverage(distribution: Record<number, number>): number {
	return Object.entries(distribution).reduce(
		(acc, [value, probability]) => acc + Number(value) * probability,
		0,
	);
}

const formatDiceCount = (() => {
	const spelledOutCounts: Record<number, string | undefined> = {
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "nine",
		10: "ten",
	};
	const numberFormat = new Intl.NumberFormat("en");

	return (count: number) => {
		return spelledOutCounts[count] ?? numberFormat.format(count);
	};
})();

const formatDiceWord = (() => {
	const pluralRules = new Intl.PluralRules("en");

	return (count: number) => {
		const category = pluralRules.select(count);
		return category === "one" ? "die" : "dice";
	};
})();

const listFormat = new Intl.ListFormat("en");

function getSubtitle(dice: readonly number[]): string {
	const distribution = diceArrayToRecord(dice);

	const diceSetDescriptions = Object.entries(distribution).map(([side, count]) =>
		`${formatDiceCount(count)} ${side}-sided ${formatDiceWord(count)}`
	);

	if (dice.length > 1) {
		return `of ${listFormat.format(diceSetDescriptions)} rolled together:`;
	}

	return `of ${listFormat.format(diceSetDescriptions)}:`;
}

interface Props {
	dice: readonly number[];
	scrollSync: ScrollSync;
	rollMode: RollMode;
	setRollMode: Dispatch<SetStateAction<RollMode>>;
}

export const Distribution: FC<Props> = ({ dice, scrollSync, rollMode, setRollMode }) => {
	const distribution = getDistribution(dice, rollFunctions[rollMode]);

	return (
		<section>
			<Stack
				direction="row"
				gap={1}
				className={styles.controls}
			>
				<div>
					<h2 style={{ marginBottom: "1rem" }}>Distribution</h2>
					<Paragraph>{getSubtitle(dice)}</Paragraph>
				</div>
				<Stack direction="row" style={{ alignItems: "end" }} gap={0.25}>
					<Button
						color="neutral"
						value="sum"
						active={rollMode === "sum"}
						onClick={() => {
							setRollMode("sum");
						}}
					>
						Sum
					</Button>
					<Button
						color="neutral"
						value="max"
						active={rollMode === "max"}
						onClick={() => {
							setRollMode("max");
						}}
					>
						Max
					</Button>
					<Button
						color="neutral"
						value="min"
						active={rollMode === "min"}
						onClick={() => {
							setRollMode("min");
						}}
					>
						Min
					</Button>
				</Stack>
			</Stack>

			<DistributionChart distribution={distribution} scrollSync={scrollSync} />

			<Paragraph style={{ marginBlock: "0.5rem" }}>
				With an average result of {Number(getDistributionAverage(distribution).toFixed(3))}
			</Paragraph>
		</section>
	);
};
