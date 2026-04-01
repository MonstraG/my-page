import type { FCC } from "@/types/react";
import { Divider } from "@/ui/Divider/Divider";
import { MyLink } from "@/ui/MyLink/MyLink";
import { Paragraph } from "@/ui/Paragraph/Paragraph";
import { Stack } from "@/ui/Stack/Stack";
import styles from "./NavLayout.module.css";
import { ScrollToTopLink } from "@/components/nav/NavLayout/ScrollToTopLink";
import { cn } from "@/functions/cn";
import { Fragment, type ReactElement } from "react";
import type { LinkProps } from "next/link";
import type { Route } from "next";

type Breadcrumb = { name: string; href?: LinkProps<Route>["href"] | undefined };

type Path =
	| undefined // for index page
	| string // for first level pages
	| Breadcrumb[]; // for deeper pages

export const MainLayout: FCC<{
	path: Path;
	width?: "regular" | "wide" | "narrow";
}> = ({ path, width = "regular", children }) => {
	const containerClasses = cn(
		styles.contained,
		width === "wide" && styles.wide,
		width === "narrow" && styles.narrow,
	);

	return (
		<>
			<div className={styles.wrapper}>
				<Header path={path} containerClasses={containerClasses} />
				<main className={cn(styles.main, containerClasses)}>{children}</main>
			</div>
			<Divider />
			<Footer containerClasses={containerClasses} />
		</>
	);
};

function Header({
	path,
	containerClasses,
}: {
	path: Path;
	containerClasses: string;
}): ReactElement {
	const fullPath: Breadcrumb[] = [
		{
			name: "arsga.eu",
			href: "/",
		},
	];
	if (typeof path === "string") {
		fullPath.push({
			name: path,
		});
	}
	if (Array.isArray(path)) {
		fullPath.push(...path);
	}

	fullPath[fullPath.length - 1].href = undefined;

	return (
		<header className={cn(containerClasses, styles.nav)}>
			<h1>
				{fullPath.map((el) => {
					if (el.href) {
						return (
							<Fragment key={el.href.toString()}>
								<MyLink href={el.href}>{el.name}</MyLink>
								<span>{" > "}</span>
							</Fragment>
						);
					}
					return <span key={el.name}>{el.name}</span>;
				})}
			</h1>
		</header>
	);
}

function Footer({ containerClasses }: { containerClasses: string }): ReactElement {
	return (
		<Stack
			component="footer"
			direction="row"
			gap={1}
			className={cn(styles.footerContent, containerClasses)}
		>
			<Stack>
				<Paragraph size="sm" color="superGray">
					Developed on{" "}
					<MyLink color="inherit" href="https://github.com/MonstraG/my-page">
						Github
					</MyLink>
					, hosted on{" "}
					<MyLink color="inherit" href="https://vercel.com/">
						Vercel
					</MyLink>
					, powered by{" "}
					<MyLink color="inherit" href="https://next.js">
						Next.js
					</MyLink>
				</Paragraph>
				<Paragraph size="sm" color="superGray">
					by Arseny Garelyshev, © 2026
				</Paragraph>
			</Stack>

			<Stack style={{ alignItems: "flex-end" }}>
				<Paragraph size="sm">
					<ScrollToTopLink /> | <MyLink href="/">Back to index page</MyLink>
				</Paragraph>
				<Paragraph size="sm" color="superGray">
					{process.env.NODE_ENV}{" "}
					{process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 6)}
				</Paragraph>
			</Stack>
		</Stack>
	);
}
