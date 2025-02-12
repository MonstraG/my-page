"use client";
import { NavLink } from "@/components/nav/NavLink/NavLink";
import type { FC } from "react";
import { usePathname } from "next/navigation";

export const NavLinks: FC = () => {
	const pathname = usePathname();

	return (
		<nav>
			<NavLink href="/about" active={pathname === "/about"}>
				About (but not really)
			</NavLink>
			<NavLink href="/" active={pathname === "/"}>
				Dice rolling
			</NavLink>
			<NavLink href="/words/en" active={pathname.startsWith("/words")}>
				Vocabulary tester
			</NavLink>
			<NavLink href="/dnd-spells" active={pathname === "/dnd-spells"}>
				DnD spells
			</NavLink>
			<NavLink href="/blog" active={pathname === "/blog"}>
				Blog thing
			</NavLink>
		</nav>
	);
};
