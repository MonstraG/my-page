import { ContributionTable } from "@/components/Github/Contributions/ContributionTable";
import type { FC } from "react";
import styles from "./contributions.module.css";
import { githubQuery } from "@/components/Github/githubQuery.ts";

export const Contributions: FC = () => (
	<div className={styles.wrapper}>
		<h2>Contributions table</h2>
		<div>
			<p>A copy of a similar contributions table like you've seen on github.</p>
			<p>Fetches data from github, re-implemented from scratch.</p>
			<p>And maybe it should have been a table.</p>
		</div>

		<ContributionTable />

		<p>Here is the graphql query:</p>
		<pre className={styles.query}>{githubQuery.trim()}</pre>
	</div>
);
