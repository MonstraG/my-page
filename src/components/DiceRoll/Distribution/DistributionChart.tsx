import type { FC } from "react";
import { useColorScheme } from "@mui/joy/styles";
import Tooltip from "@mui/joy/Tooltip";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";
import { styled } from "@mui/joy/styles";

const DistributionContainer = styled("div")`
	display: flex;
	flex-direction: row;
	height: 200px;
	overflow-x: auto;
	gap: ${({ theme }) => theme.spacing(0.5)};

	/* padding bottom to have space for scrollbar */
	padding-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Column = styled("div", { shouldForwardProp: (prop) => prop !== "$mode" })<{
	$mode: "dark" | "light" | "system" | undefined;
}>`
	display: flex;
	align-items: flex-end;
	height: 100%;

	border: 1px solid
		${({ $mode }) => ($mode === "dark" ? "rgba(255, 255, 255, 0.24)" : "rgba(0, 0, 0, 0.12)")};
`;

const ColumnFilling = styled("div")`
	background: #c06868;
	width: 24px;
	border-radius: 2px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
`;

function ratioToPercent(ratio: number | null): string {
	return ((ratio ?? 0) * 100).toFixed(2) + "%";
}

interface Props {
	distribution: Record<number, number>;
	scrollSync: ScrollSync;
}

export const DistributionChart: FC<Props> = ({ distribution, scrollSync }) => {
	const max = Object.values(distribution).reduce((acc, next) => (next > acc ? next : acc));
	const { mode } = useColorScheme();

	return (
		<DistributionContainer {...scrollSync}>
			{Object.entries(distribution).map(([result, probability]) => (
				<Tooltip title={ratioToPercent(probability)} key={result} disablePortal>
					<Column $mode={mode}>
						<ColumnFilling style={{ height: ratioToPercent(probability / max) }}>
							{result}
						</ColumnFilling>
					</Column>
				</Tooltip>
			))}
		</DistributionContainer>
	);
};
