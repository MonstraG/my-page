import type { Metadata, NextPage } from "next";
import Typography from "@mui/joy/Typography";
import Container from "@mui/joy/Container";
import { getPost } from "@/app/(app)/blog/getPost";

const { data, content } = await getPost("covariance-contravariance");

const getTitle = () => {
	if (typeof data?.title === "string") {
		return data.title;
	}
	return "Blog";
};

export const metadata: Metadata = {
	title: getTitle()
};

const BlogPage: NextPage = () => (
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

export default BlogPage;
