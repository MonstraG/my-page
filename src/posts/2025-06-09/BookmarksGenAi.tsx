import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";

export const bookmarksGenAi: Post = {
	title: "Bookmarks and thinking about genAI",
	slug: "bookmarks-genai",
	date: "2025-06-09",
	categories: ["Bookmarks"],
	body: <BookmarksGenAi />,
};

function BookmarksGenAi(): ReactElement {
	return (
		<>
			<p>
				Some time ago I found this on hacker news:{" "}
				<a href="https://alexwlchan.net/2025/bookmarks-static-site/">
					Creating a static website for all my bookmarks
				</a>
				, with a very simple premise: instead of bookmarking articles in browser, you just
				plop them in with some tags and short summary.
			</p>
			<p>
				I liked this approach, and here is my first bookmark:{" "}
				<a href="https://blog.glyph.im/2025/06/i-think-im-done-thinking-about-genai-for-now.html">
					I Think I’m Done Thinking About genAI For Now
				</a>
			</p>
			<p>
				(you can note lack of my summary or tags, and that's because I would actually
				probably want to do something better than to repurpose my md-generated blog for
				that)
			</p>
		</>
	);
}
