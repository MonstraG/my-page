"use client";
import { D20Icon } from "@/icons/custom/D20Icon";
import { GithubIcon } from "@/icons/custom/GithubIcon";
import { CasinoIcon } from "@/icons/material/CasinoIcon";
import { CloseIcon } from "@/icons/material/CloseIcon";
import { DictionaryIcon } from "@/icons/material/DictionaryIcon";
import { HomeFilledIcon } from "@/icons/material/HomeFilledIcon";
import { MenuIcon } from "@/icons/material/MenuIcon";
import { NewsIcon } from "@/icons/material/NewsIcon";
import { Button } from "@/ui/Button/Button";
import { ListItemLink } from "@/ui/ListItemLink/ListItemLink";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { type FC, useCallback, useState } from "react";
import styles from "./NavLinks.module.css";

export const NavLinks: FC = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);

	const toggleOpen = useCallback(() => {
		setOpen(prev => !prev);
	}, []);

	const handleItemClick = useCallback(() => {
		setOpen(false);
	}, []);

	return (
		<>
			<Button
				onClick={toggleOpen}
				startDecorator={open ? <CloseIcon /> : <MenuIcon />}
				className={styles.menuButton}
				variant="plain"
			>
				{open ? "Close" : "Menu"}
			</Button>
			<ul className={clsx(styles.navList, open && styles.open)}>
				<ListItemLink
					href="/"
					active={pathname === "/"}
					icon={<HomeFilledIcon />}
					onClick={handleItemClick}
				>
					Home
				</ListItemLink>
				<ListItemLink
					href="/about"
					active={pathname === "/about"}
					icon={<GithubIcon />}
					onClick={handleItemClick}
				>
					About (but not really)
				</ListItemLink>
				<ListItemLink
					href="/dice"
					active={pathname === "/dice"}
					icon={<CasinoIcon />}
					onClick={handleItemClick}
				>
					Dice rolling
				</ListItemLink>
				<ListItemLink
					href="/words/en"
					active={pathname.startsWith("/words")}
					icon={<DictionaryIcon />}
					onClick={handleItemClick}
				>
					Vocabulary tester
				</ListItemLink>
				<ListItemLink
					href="/dnd-spells"
					active={pathname === "/dnd-spells"}
					icon={<D20Icon />}
					onClick={handleItemClick}
				>
					DnD spells
				</ListItemLink>
				<ListItemLink
					href="/blog"
					active={pathname === "/blog"}
					icon={<NewsIcon />}
					onClick={handleItemClick}
				>
					Blog thing
				</ListItemLink>
			</ul>
		</>
	);
};
