import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";

export const xkcdThingsYouShouldNotDo: Post = {
	title: "Xkcd's things you should not do",
	slug: "xkcd-things-you-should-not-do",
	date: "2024-04-26",
	image: {
		src: "/xkcd-things-you-should-not-do.webp",
		alt: "xkcd things you should not do comic",
		width: 436,
		height: 738,
	},
	categories: ["Ideas somebody already made"],
	body: <XkcdThingsYouShouldNotDo />,
};

function XkcdThingsYouShouldNotDo(): ReactElement {
	return (
		<>
			<p>
				Randall Munroe, author of an excellent "blog"{" "}
				<a href="https://what-if.xkcd.com">what-if</a> has come up with this joke list of
				things you should not do in his latest book,{" "}
				<a href="https://xkcd.com/what-if-2">what if? 2</a> (latest at the time of writing).
			</p>
			<p>The list is on the cover picture:</p>
			<pre>
				{`Things you should not do

#156,830 Build a rocket out of old tires and try to launch it
#156,831 Try to swim across the pacific ocean
#156,832 Stick your hand in the particle accelerator
...`}
			</pre>
			<p>
				I think, the list makes first appearance in the blog itself, and gets gradually
				expanded in some of the articles and then the books.
			</p>
			<p>
				Now, I bought the book and came across the list in the book and found it very
				amusing, and come up with a great idea: why not compile/generate a similar list and
				put it online.
			</p>
			<p>
				I would need to think about where to get more entries from, maybe there are more
				pieces online?..
			</p>
			<p>
				Sixth link in google:{" "}
				<a href="https://thriving-kitten-e80056.netlify.app">
					https://thriving-kitten-e80056.netlify.app
				</a>{" "}
				(link to github if his netlify app dies:{" "}
				<a href="https://github.com/CamerAllan/things-you-should-not-do">
					https://github.com/CamerAllan/things-you-should-not-do
				</a>
				)
			</p>
			<p>...</p>
			<p>
				Of course, somebody already made AI-generated, every-day-updated version of this
				very list.
			</p>
		</>
	);
}
