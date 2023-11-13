import IconButton from "@mui/joy/IconButton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import type { FCC } from "@/types/react";
import { styled } from "@mui/joy/styles";
import type { ReactNode } from "react";

const Column = styled("div")`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: ${({ theme }) => theme.spacing(2)};
	gap: ${({ theme }) => theme.spacing(2)};
	border-right: 1px solid ${({ theme }) => theme.palette.neutral.outlinedBorder};
	min-width: 200px;
`;

const Title = styled("div")`
	display: grid;
	grid-template-columns: 1fr auto 1fr;
`;

interface Props {
	onRemove?: () => void;
	title: string;
	footer?: ReactNode;
}

export const FactoryLayerColumn: FCC<Props> = ({ title, onRemove, children, footer }) => (
	<Column>
		<Title>
			<Typography level="h4" sx={{ gridColumn: 2, textAlign: "center" }}>
				{title}
			</Typography>
			{onRemove && (
				<IconButton
					onClick={onRemove}
					variant="plain"
					color="neutral"
					size="sm"
					sx={{ gridColumn: 3, justifySelf: "end" }}
				>
					<DeleteIcon />
				</IconButton>
			)}
		</Title>

		<Stack justifyContent="center" alignItems="center">
			{children}
		</Stack>

		{footer}
	</Column>
);
