"use client";
import { ArticleContainer } from "@/ui/Container/ArticleContainer";
import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import type { NextPage } from "next";

const TestPage: NextPage = () => {
	return (
		<ArticleContainer>
			<h1 style={{ marginBottom: "2rem" }}>Test page</h1>
			<Paragraph>
				This page exists only to test various ui elements in local development.{" "}
				<MyLink href="/">Back to home.</MyLink>
			</Paragraph>
		</ArticleContainer>
	);
};

export default TestPage;
