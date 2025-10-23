"use client";
import { allPages } from "@/components/nav/pages";
import { CloseIcon } from "@/icons/material/CloseIcon";
import { MenuIcon } from "@/icons/material/MenuIcon";
import { Button } from "@/ui/Button/Button";
import { ListItemLink } from "@/ui/ListItemLink/ListItemLink";
import { cn } from "@/functions/cn";
import { usePathname } from "next/navigation";
import { type FC, useState } from "react";
import styles from "./TopBarLinks.module.css";

export const TopBarLinks: FC = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);

	const pageSlug = pathname.split("/")[1];

	return (
		<>
			<Button
				onClick={() => setOpen((prev) => !prev)}
				startDecorator={open ? <CloseIcon /> : <MenuIcon />}
				className={styles.menuButton}
				variant="plain"
			>
				{open ? "Close" : "Menu"}
			</Button>
			<ul className={cn(styles.navList, open && styles.open)}>
				{allPages
					.filter((page) => ("ignoreOnNav" in page ? !page.ignoreOnNav : true))
					.map((page) => {
						if (!page.href) {
							return null;
						}
						return (
							<ListItemLink
								key={page.slug}
								href={page.href}
								active={pageSlug === page.slug}
								icon={<page.Icon />}
								onClick={() => setOpen(false)}
							>
								{page.name}
							</ListItemLink>
						);
					})}
			</ul>
		</>
	);
};
