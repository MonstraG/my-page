import type { FC } from "react";
import { diceImages } from "@/components/DiceRoll/DiceSeletion/diceImages";
import { Stack, Typography, styled, type Theme } from "@mui/joy";
import { Button } from "@mui/base";

/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow#syntax:
 * The drop-shadow() function accepts a parameter of type <shadow> (defined in the box-shadow property),
 * with the exception that the inset keyword and spread parameters are not allowed.
 * @param shadowValue like `inset 1px 2px 3px 4px red`
 * @returns drop-shadow(1px 2px 3px red)
 */
const boxShadowToDropShadow = (shadowValue: string) => {
	const args = shadowValue.replace("inset", "").trim().split(" ");
	if (args.length >= 5) {
		args.splice(3, 1);
	}
	return `drop-shadow(${args.join(" ")})`;
};

const splitShadows = new RegExp(/,(?![^(]*\))/, "g");

/**
 * Joy elevations consist of multiple shadows
 * @param elevation value from `theme.shadow`
 * @returns properly formatted string for css `filter` property
 */
const joyElevationToDropShadows = (elevation: string) => {
	const boxShadows = elevation.split(splitShadows);
	const dropShadows = boxShadows.map(boxShadowToDropShadow);
	return dropShadows.join(" ");
};

const DiceButton = styled(Button)`
	width: 40px;
	height: 40px;
	border: none;
	background: none;
	cursor: pointer;
	padding: 0;

	transition: box-shadow0.2s ease-in-out;

	svg {
		filter: ${({ theme }: { theme: Theme }) => joyElevationToDropShadows(theme.shadow.sm)};
	}
	:hover {
		svg {
			filter: ${({ theme }: { theme: Theme }) => joyElevationToDropShadows(theme.shadow.md)};
		}
	}

	.Mui-active,
	:active {
		svg {
			filter: ${({ theme }: { theme: Theme }) => joyElevationToDropShadows(theme.shadow.sm)};
		}
	}
`;

function groupSame(array: readonly number[]): readonly number[][] {
	return array.reduce<number[][]>((acc, val) => {
		if (!acc.length || acc[acc.length - 1][0] !== val) {
			acc.push([val]);
		} else {
			acc[acc.length - 1].push(val);
		}
		return acc;
	}, []);
}

interface Props {
	title: string;
	dice: readonly number[];
	onDiceClick: (die: number, index: number) => void;
}

export const DiceBag: FC<Props> = ({ title, dice, onDiceClick }) => (
	<Stack width="328px" alignItems="center">
		<Typography level="h3" gutterBottom>
			{title}
		</Typography>

		<Stack direction="row" flexWrap="wrap" alignItems="center" gap={1}>
			{groupSame(dice).map((sameSideDice, groupIndex) => (
				<Stack
					direction="row"
					flexWrap="wrap"
					alignItems="center"
					key={groupIndex}
					gap={0.25}
				>
					{sameSideDice.map((die, dieIndex) => (
						<DiceButton
							key={dieIndex}
							onClick={() => {
								onDiceClick(die, dieIndex);
							}}
						>
							{diceImages[die]}
						</DiceButton>
					))}
				</Stack>
			))}
		</Stack>
	</Stack>
);
