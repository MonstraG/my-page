import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";

export const mathRandom: Post = {
	title: "Math.random and the highest number",
	slug: "math-random",
	date: "2025-06-17",
	categories: ["Programming"],
	body: <MathRandom />,
};

function MathRandom(): ReactElement {
	return (
		<>
			<blockquote>
				<p>
					<code>Math.random()</code> returns a floating-point, pseudo-random number in the
					range [0, 1) that is, from 0 (inclusive) up to but not including 1 (exclusive),
					which you can then scale to your desired range.
				</p>
			</blockquote>
			<p>
				Says the entire internet. Is that actually true? Most likely. But how close does it
				go to 1?
			</p>
			<p>
				Before actually thinking about it seriously, I just printed a bunch of{" "}
				<code>Math.random()</code>s:
			</p>
			<pre>
				{`>>> Math.random()
0.729915328944463
>>> Math.random()
0.03224859577769057
>>> Math.random()
0.8620920081096829
>>> Math.random()
0.7134743894246364
>>> Math.random()
0.13529371358407993
>>> Math.random()
0.5222580429369429
>>> Math.random()
0.6894964150128524`}
			</pre>
			<p>picked one of the longest, and counted the amount of digits</p>
			<pre>
				{`>>> "13529371358407993".length
17`}
			</pre>
			<p>
				Okay, so the max must be <code>0.99999999999999999</code> (17 nines), so I type it
				out in the console:
			</p>
			<pre>
				{`>>> 0.99999999999999999
1`}
			</pre>
			<p>What?</p>
			<pre>
				{`>>> 0.99999999999999999 === 1
true`}
			</pre>
			<p>...</p>
			<p>But ain't supposed to return 1!</p>
			<p>
				Turns out, <code>0.99999999999999998</code>, <code>0.99..97</code>,{" "}
				<code>0.99..96</code> and <code>0.99999999999999995</code> all actually equal to{" "}
				<code>1</code>.
			</p>
			<p>
				If you don't believe me, go press <code>F12</code> and paste{" "}
				<code>0.99999999999999995</code> in the console!
			</p>
			<p>
				The first number that is actually smaller is <code>0.99999999999999994</code>, that
				one is equal to <code>0.9999999999999999</code> (one nine less).
			</p>
			<p>
				After that I went around googling and searching and found this stack overflow
				question:{" "}
				<a href="https://stackoverflow.com/questions/64052337/what-is-the-max-value-that-math-random-can-produce">
					What is the max value that Math.random can produce?
				</a>
			</p>
			<p>
				So in short, the max is all 53 significant bytes are 1 and mantissa is -1, which is
				the same as <code>Math.pow(2, -53)</code> (which is{" "}
				<code>1.1102230246251565e-16</code> btw), and subtracting it from 1 gives us the
				16-nines number again:
			</p>
			<pre>
				{`>>> 1 - Math.pow(2, -53)
0.9999999999999999`}
			</pre>
			<p>So, takeaways I guess:</p>
			<ol>
				<li>
					The maximum number <code>Math.random</code> can return is{" "}
					<code>0.9999999999999999</code>, and that is less than 1.
				</li>
				<li>
					Some other numbers it returns could have more significant digits (sometimes 17,
					and I think I've seen 18), but the actual max number will have only 16 nines.
				</li>
			</ol>
			<p>Huh. Today I learned.</p>
		</>
	);
}
