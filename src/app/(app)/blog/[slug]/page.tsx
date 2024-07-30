import { getPost } from "@/app/(app)/blog/posts";
import type { Metadata } from "next";
import Container from "@mui/joy/Container";
import Typography from "@mui/joy/Typography";

interface Params {
	slug: string;
}

interface Props {
	params: Params;
	searchParams: Record<string, string | string[] | undefined>;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
	const { data } = await getPost(params.slug);
	if (typeof data?.title === "string") {
		return {
			title: data.title
		};
	}

	return {
		title: "Blog"
	};
};

const ArticlePage = async ({ params }: Props) => {
	const { content } = await getPost(params.slug);

	return (
		<Container sx={{ py: 10 }}>
			<Typography
				component="div"
				sx={{
					pre: {
						background: "rgba(255,255,255,0.05)",
						p: 2
					}
				}}
			>
				<article dangerouslySetInnerHTML={{ __html: content }} />
			</Typography>
		</Container>
	);
};

export default ArticlePage;
