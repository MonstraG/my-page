import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import { NavigatorInfo } from "@/components/NavigatorInfo.tsx";

export const metadata: Metadata = {
	title: "Navigator info",
	description: "This was helpful in my debugging once"
};

const NavigatorInfoPage: NextPage = () => {
	return (
		<ArticleContainer>
			<Stack component="section" gap={1}>
				<h1>Navigator</h1>
				<p>
					This is all properties of `navigator` on your device:
				</p>
				<NavigatorInfo />
			</Stack>
		</ArticleContainer>
	);
};

export default NavigatorInfoPage;
