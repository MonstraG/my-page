import type { NextPage } from "next";
import { Profile } from "@/components/Github/Profile/Profile";
import { Contributions } from "@/components/Github/Contributions/Contributions";

const IndexPage: NextPage = () => (
	<>
		<Profile />
		<Contributions />
	</>
);

export default IndexPage;
