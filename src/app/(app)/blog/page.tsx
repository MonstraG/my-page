import type { NextPage } from "next";
import Typography from "@mui/joy/Typography";
import Container from "@mui/joy/Container";
import { getPost } from "@/app/(app)/blog/getPost";

const BlogPage: NextPage = async () => {
	const blog = await getPost("covariance-contravariance");

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
				<article dangerouslySetInnerHTML={{ __html: blog }} />
			</Typography>
		</Container>
	);
};

export default BlogPage;
