import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";

export const grugbrainDev: Post = {
	title: "Grugbrain dev",
	slug: "grugbrain-dev",
	date: "2025-06-19",
	categories: ["Bookmarks"],
	body: <GrugbrainDev />,
};

function GrugbrainDev(): ReactElement {
	return (
		<>
			<p>
				<a href="https://grugbrain.dev/">Grugbrain</a>
			</p>
			<p>I bought the book btw)</p>
		</>
	);
}
