import Container from "@mui/joy/Container";
import type { NextPage } from "next";
import Typography from "@mui/joy/Typography";

const IndexPage: NextPage = () => {
	return (
		<Container sx={{ py: 10 }}>
			<Typography level="h1" gutterBottom>
				If you landed here and expected to find something, make sure that your link is
				correct.
			</Typography>
			<Typography level="h2" gutterBottom>
				Eventually, I&apos;ll put some things up here for you too click around in, but not
				just yet.
			</Typography>
			<Typography level="h2">Have a nice day!</Typography>
		</Container>
	);
};

export default IndexPage;
