import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import type { Metadata, NextPage } from "next";
import { SnackButtonTester } from "@/components/snack/SnackButtonTester";
import { MainLayout } from "@/components/nav/NavLayout/MainLayout";
import { allPages, getMetadata } from "@/components/nav/pages";

export const metadata: Metadata = getMetadata(allPages.test);

const TestPage: NextPage = () => (
	<MainLayout path={allPages.test.title}>
		<Stack component="article" gap={1}>
			<Paragraph>
				This page exists only to test various ui elements in local development.{" "}
				<MyLink href="/">Back to home.</MyLink>
			</Paragraph>
			<SnackButtonTester />
		</Stack>
	</MainLayout>
);

export default TestPage;
