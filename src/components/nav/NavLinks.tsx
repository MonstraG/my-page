"use client";
import { CasinoIcon } from "@/icons/CasinoIcon";
import { D20Icon } from "@/icons/D20Icon";
import { DictionaryIcon } from "@/icons/DictionaryIcon";
import { GithubIcon } from "@/icons/GithubIcon";
import { NewsIcon } from "@/icons/NewsIcon";
import { ListItemLink } from "@/ui/ListItemLink/ListItemLink";
import { usePathname } from "next/navigation";
import type { FC } from "react";
import styles from "./NavLinks.module.css";

export const NavLinks: FC = () => {
	const pathname = usePathname();

	return (
		<nav className={styles.nav}>
			<ul className={styles.navList}>
				<ListItemLink
					href="/about"
					active={pathname === "/about"}
					icon={<GithubIcon />}
				>
					About (but not really)
				</ListItemLink>
				<ListItemLink href="/" active={pathname === "/"} icon={<CasinoIcon />}>
					Dice rolling
				</ListItemLink>
				<ListItemLink
					href="/words/en"
					active={pathname.startsWith("/words")}
					icon={<DictionaryIcon />}
				>
					Vocabulary tester
				</ListItemLink>
				<ListItemLink
					href="/dnd-spells"
					active={pathname === "/dnd-spells"}
					icon={<D20Icon />}
				>
					DnD spells
				</ListItemLink>
				<ListItemLink href="/blog" active={pathname === "/blog"} icon={<NewsIcon />}>
					Blog thing
				</ListItemLink>
			</ul>
		</nav>
	);
};
