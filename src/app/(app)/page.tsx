import type { NextPage } from "next";
import { Profile } from "@/components/Profile/Profile";
import { Contributions } from "@/components/Contributions/Contributions";

const IndexPage: NextPage = () => (
	<>
		<Profile />
		<Contributions />
	</>
);

export default IndexPage;
