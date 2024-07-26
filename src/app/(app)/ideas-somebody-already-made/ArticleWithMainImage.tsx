import Typography from "@mui/joy/Typography";
import Image, { type ImageProps } from "next/image";
import type { FCC } from "@/types/react";
import Stack from "@mui/joy/Stack";

interface Props {
	title: string;
	ImageProps: ImageProps;
}

export const ArticleWithMainImage: FCC<Props> = ({ title, ImageProps, children }) => (
	<article>
		<Typography level="h2" gutterBottom>
			{title}
		</Typography>
		<Stack sx={{ my: 8 }} alignItems="center">
			<Image {...ImageProps} />
		</Stack>
		<Stack gap={2}>{children}</Stack>
	</article>
);
