"use client";
import { ListItemLink } from "@/ui/ListItemLink/ListItemLink";
import type { FC } from "react";
import { usePathname } from "next/navigation";

export const NavLinks: FC = () => {
	const pathname = usePathname();

	return (
		<nav>
			<ul style={{ listStyle: "none", padding: 0 }}>
				<ListItemLink href="/about" active={pathname === "/about"}>
					About (but not really)
				</ListItemLink>
				<ListItemLink href="/" active={pathname === "/"}>
					Dice rolling
				</ListItemLink>
				<ListItemLink href="/words/en" active={pathname.startsWith("/words")}>
					Vocabulary tester
				</ListItemLink>
				<ListItemLink href="/dnd-spells" active={pathname === "/dnd-spells"}>
					DnD spells
				</ListItemLink>
				<ListItemLink href="/blog" active={pathname === "/blog"}>
					Blog thing
				</ListItemLink>
			</ul>
		</nav>
	);
};
