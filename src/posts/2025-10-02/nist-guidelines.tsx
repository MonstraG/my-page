import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";

export const nistGuidelines: Post = {
	title: "NIST guidelines",
	slug: "nist-guidelines",
	date: "2025-10-02",
	categories: ["Programming"],
	body: <NistGuidelines />,
};

function NistGuidelines(): ReactElement {
	return (
		<>
			<p>I keep loosing the bookmark for the NIST guidelines, so here is a link to them:</p>
			<a href="https://pages.nist.gov/800-63-4/" rel="noreferrer">
				https://pages.nist.gov/800-63-4/
			</a>
			<p>
				And here is a link directly to section I would most likely need to reference -
				<strong>3.1.1.2. Password Verifiers:</strong>
			</p>
			<a href="https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver" rel="noreferrer">
				https://pages.nist.gov/800-63-4/sp800-63b.html#passwordver
			</a>
		</>
	);
}
