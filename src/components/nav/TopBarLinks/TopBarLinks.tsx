"use client";
import { allPages } from "@/components/nav/pages";
import { CloseIcon } from "@/icons/material/CloseIcon";
import { MenuIcon } from "@/icons/material/MenuIcon";
import { Button } from "@/ui/Button/Button";
import { ListItemLink } from "@/ui/ListItemLink/ListItemLink";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { type FC, useCallback, useMemo, useState } from "react";
import styles from "./TopBarLinks.module.css";

export const TopBarLinks: FC = () => {
	const pathname = usePathname();
	const [open, setOpen] = useState<boolean>(false);

	const pageSlug = useMemo(() => {
		return pathname.split("/")[1];
	}, [pathname]);

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
				{allPages.filter(page => !page.ignoreOnNav).map(page => (
					<ListItemLink
						key={page.slug}
						href={page.href}
						active={pageSlug === page.slug}
						icon={<page.Icon />}
						onClick={handleItemClick}
					>
						{page.name}
					</ListItemLink>
				))}
			</ul>
		</>
	);
};
