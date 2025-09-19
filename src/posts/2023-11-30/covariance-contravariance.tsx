import type { ReactElement } from "react";
import type { Post } from "@/components/blog/post.types";
import {
	CodeBlock,
	CodeComment,
	CodeLine,
	CodeOp,
	CodeOther,
	CodeProp,
	CodeVar,
} from "@/components/blog/CodeElements/CodeElements";

export const covarianceContravariance: Post = {
	title: "Covariance and contravariance",
	slug: "covariance-contravariance",
	date: "2023-11-30",
	categories: ["Programming"],
	body: <CovarianceContravariance />,
};

function CovarianceContravariance(): ReactElement {
	return (
		<>
			<p>You can do:</p>
			<pre>
				<code>
					<CodeLine>
						<CodeVar>Animal</CodeVar>
						<CodeVar> animal</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOp> new</CodeOp>
						<CodeVar> Cat</CodeVar>

						<CodeOther>();</CodeOther>
					</CodeLine>
				</code>
			</pre>

			<p>but you cannot do:</p>
			<pre>
				<code>
					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Animal</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>animals</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOp> new</CodeOp>
						<CodeVar> List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Cat</CodeVar>
						<CodeOther>&gt;();</CodeOther>
					</CodeLine>
				</code>
			</pre>
			<p>Why?</p>
			<p>The problem is, that if this would be allowed, then this could happen:</p>
			<pre>
				<code>
					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Animal</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>animals</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOp> new</CodeOp>
						<CodeVar> List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Cat</CodeVar>
						<CodeOther>&gt;();</CodeOther>
					</CodeLine>

					<CodeLine>
						<CodeOther>animals.</CodeOther>
						<CodeProp>Add</CodeProp>
						<CodeOther>(</CodeOther>
						<CodeOp>new</CodeOp>
						<CodeVar> Dog</CodeVar>
						<CodeOther>());</CodeOther>
					</CodeLine>
				</code>
			</pre>
			<p>
				By going through the intermediary <code>animals</code> list, we just put a{" "}
				<code>Dog</code> in the <code>Cat</code>s list.
			</p>
			<p>
				And we could make the <code>Dog</code> meow:
			</p>
			<pre>
				<code>
					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Cat</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>cats</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOp> new</CodeOp>
						<CodeVar> List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Cat</CodeVar>
						<CodeOther>&gt;();</CodeOther>
					</CodeLine>

					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Animal</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>animals</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOther> cats; </CodeOther>
						<CodeComment>{"// the only problematic line"}</CodeComment>
					</CodeLine>

					<CodeLine>
						<CodeOther>animals.</CodeOther>
						<CodeProp>Add</CodeProp>
						<CodeOther>(</CodeOther>
						<CodeOp>new</CodeOp>
						<CodeVar> Dog</CodeVar>
						<CodeOther>());</CodeOther>
					</CodeLine>

					<CodeLine />

					<CodeLine>
						<CodeOp>foreach</CodeOp>
						<CodeOther> (</CodeOther>
						<CodeOp>var</CodeOp>
						<CodeVar> cat</CodeVar>
						<CodeOp> in</CodeOp>
						<CodeOther> cats)</CodeOther>
					</CodeLine>

					<CodeBlock>
						<CodeOther>cat.</CodeOther>
						<CodeProp>Meow</CodeProp>
						<CodeOther>();</CodeOther>
					</CodeBlock>
				</code>
			</pre>
			<p>
				For this reason, even though <code>Cat</code> inherits <code>Animal</code> and can
				be assigned, <code>T&lt;Cat&gt;</code> is not assignable to{" "}
				<code>T&lt;Animal&gt;</code>.
			</p>
			<p>
				But for some cases, it would be really nice, I want to feed all of my pets (two cats
				and a dog):
			</p>
			<pre>
				<code>
					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Cat</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>cats</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOp> new</CodeOp>
						<CodeVar> List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Cat</CodeVar>
						<CodeOther>&gt; {"{ "}</CodeOther>
						<CodeOp>new</CodeOp>
						<CodeVar> Cat</CodeVar>
						<CodeOther>(), </CodeOther>
						<CodeOp>new</CodeOp>
						<CodeVar> Cat</CodeVar>
						<CodeOther>(){" }"};</CodeOther>
					</CodeLine>

					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Dog</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>dogs</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOp> new</CodeOp>
						<CodeVar> List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Dog</CodeVar>
						<CodeOther>&gt; {"{ "}</CodeOther>
						<CodeOp>new</CodeOp>
						<CodeVar> Dog</CodeVar>
						<CodeOther>(){" }"};</CodeOther>
					</CodeLine>

					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Animal</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>pets</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOther> cats </CodeOther>
						<CodeOp>+</CodeOp>
						<CodeOther> dogs;</CodeOther>
					</CodeLine>

					<CodeLine />

					<CodeLine>
						<CodeOp>foreach</CodeOp>
						<CodeOther> (</CodeOther>
						<CodeOp>var</CodeOp>
						<CodeVar> pet</CodeVar>
						<CodeOp> in</CodeOp>
						<CodeOther> pets)</CodeOther>
					</CodeLine>

					<CodeBlock>
						<CodeOther>pet.</CodeOther>
						<CodeProp>Eat</CodeProp>
						<CodeOther>();</CodeOther>
					</CodeBlock>
				</code>
			</pre>
			<p>
				Here, I'm not hiding the dog among cats, I just want them together, no matter who
				they are. I would give up my ability to write to this list later, just to feed my
				pets!
			</p>
			<p>Turns out, you can give it up, and feed everyone:</p>
			<pre>
				<code>
					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Cat</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>cats</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOp> new</CodeOp>
						<CodeVar> List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Cat</CodeVar>
						<CodeOther>&gt; {"{ "}</CodeOther>
						<CodeOp>new</CodeOp>
						<CodeVar> Cat</CodeVar>
						<CodeOther>(), </CodeOther>
						<CodeOp>new</CodeOp>
						<CodeVar> Cat</CodeVar>
						<CodeOther>(){" }"};</CodeOther>
					</CodeLine>

					<CodeLine>
						<CodeVar>List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Dog</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>dogs</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOp> new</CodeOp>
						<CodeVar> List</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Dog</CodeVar>
						<CodeOther>&gt; {"{ "}</CodeOther>
						<CodeOp>new</CodeOp>
						<CodeVar> Dog</CodeVar>
						<CodeOther>(){" }"};</CodeOther>
					</CodeLine>

					<CodeLine>
						<CodeVar>IEnumerable</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Animal</CodeVar>
						<CodeOther>&gt; </CodeOther>
						<CodeVar>pets</CodeVar>
						<CodeOp> =</CodeOp>
						<CodeOther> cats.</CodeOther>
						<CodeProp>Concat</CodeProp>
						<CodeOther>&lt;</CodeOther>
						<CodeVar>Animal</CodeVar>
						<CodeOther>&gt;(dogs); </CodeOther>
						<CodeComment>{"// works!"}</CodeComment>
					</CodeLine>

					<CodeLine />

					<CodeLine>
						<CodeOp>foreach</CodeOp>
						<CodeOther> (</CodeOther>
						<CodeOp>var</CodeOp>
						<CodeVar> pet</CodeVar>
						<CodeOp> in</CodeOp>
						<CodeOther> pets)</CodeOther>
					</CodeLine>

					<CodeBlock>
						<CodeOther>pet.</CodeOther>
						<CodeProp>Eat</CodeProp>
						<CodeOther>();</CodeOther>
					</CodeBlock>
				</code>
			</pre>
			<p>
				Here, I replaced <code>pets</code> list with <code>IEnumerable</code>, which is a
				kind of sequence you cannot write to. <code>.Concat</code> creates a new sequence,
				and in the definition of IEnumerable you can see:
			</p>
			<pre>
				<code>
					<CodeLine>
						<CodeOp>public</CodeOp>
						<CodeOp> interface</CodeOp>
						<CodeVar> IEnumerable</CodeVar>
						<CodeOther>&lt;</CodeOther>
						<CodeOp>out</CodeOp>
						<CodeVar> T</CodeVar>
						<CodeOther>&gt; {"{ }"}</CodeOther>
					</CodeLine>
				</code>
			</pre>
			<p>
				That <code>out</code> in <code>&lt;out T&gt;</code> means that you can only take{" "}
				<code>T</code>'s <code>out</code>, and cannot put anything <code>in</code> to break
				the list.
			</p>
			<p>That's what covariance is.</p>
			<p>
				Contravariance is the same, except it says <code>&lt;in T&gt;</code>, so you can put
				stuff in, but not take it out.
			</p>
		</>
	);
}
