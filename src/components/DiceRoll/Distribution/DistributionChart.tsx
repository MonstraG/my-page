import type { Dispatch, FC, SetStateAction } from "react";
import { useColorScheme, styled } from "@mui/joy/styles";
import Tooltip from "@mui/joy/Tooltip";
import type { ScrollSync } from "@/components/DiceRoll/Distribution/useScrollSync";

const DistributionHost = styled("div")`
	height: 232px; // 200px + padding
	overflow: visible;
	display: flex;
`;

const DistributionContainer = styled(DistributionHost)`
	display: flex;
	flex-direction: row;
	overflow-x: auto;
	overflow-y: visible;

	/* padding bottom to have space for scrollbar */
	padding: ${({ theme }) => theme.spacing(2, 0)};

	// minus container gutters
	max-width: calc(100vw - ${({ theme }) => theme.spacing(6)});

	position: absolute;
	left: 50%;
	transform: translateX(-50%);
`;

// so that inter-column space would be covered by tooltip
const TooltipHost = styled("div")`
	:not(:first-of-type) {
		padding-left: ${({ theme }) => theme.spacing(0.25)};
	}
	:not(:last-of-type) {
		padding-right: ${({ theme }) => theme.spacing(0.25)};
	}
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
	openTooltip: number | null;
	setOpenTooltip: Dispatch<SetStateAction<number | null>>;
}

export const DistributionChart: FC<Props> = ({
	distribution,
	scrollSync,
	openTooltip,
	setOpenTooltip
}) => {
	const max = Object.values(distribution).reduce((acc, next) => (next > acc ? next : acc));
	const { mode } = useColorScheme();

	return (
		<DistributionHost>
			<DistributionContainer {...scrollSync}>
				{Object.entries(distribution).map(([result, probability]) => (
					<Tooltip
						title={ratioToPercent(probability)}
						key={result}
						open={openTooltip === Number(result)}
						onOpen={() => setOpenTooltip(Number(result))}
						onClose={() => setOpenTooltip(null)}
					>
						<TooltipHost>
							<Column $mode={mode}>
								<ColumnFilling
									style={{ height: ratioToPercent(probability / max) }}
								>
									{result}
								</ColumnFilling>
							</Column>
						</TooltipHost>
					</Tooltip>
				))}
			</DistributionContainer>
		</DistributionHost>
	);
};
