"use client";
import { ListItemLink } from "@/ui/ListItemLink/ListItemLink";
import type { FC } from "react";
import { usePathname } from "next/navigation";
import { CasinoIcon } from "@/icons/CasinoIcon";
import { NewsIcon } from "@/icons/NewsIcon";
import { D20Icon } from "@/icons/D20Icon";
import { DictionaryIcon } from "@/icons/DictionaryIcon";
import { GithubIcon } from "@/icons/GithubIcon";

export const NavLinks: FC = () => {
	const pathname = usePathname();

	return (
		<nav>
			<ul style={{ listStyle: "none", padding: 0 }}>
				<ListItemLink href="/about" active={pathname === "/about"} icon={<GithubIcon />}>
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
