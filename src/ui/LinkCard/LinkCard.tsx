import type { SvgIcon } from "@/icons/icon.type";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import { cn } from "@/functions/cn";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, FC } from "react";
import styles from "./LinkCard.module.css";
import type { Route } from "next";

interface LinkCardProps
	extends Omit<LinkProps<Route>, "href">,
		Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	Icon: SvgIcon;
	header: string;
	description: string;
	href: Route | undefined;
}

export const LinkCard: FC<LinkCardProps> = ({
	Icon,
	header,
	description,
	className,
	href,
	...rest
}) => {
	const disabled = !href;

	const content = (
		<Sheet className={cn(styles.cardSheet, disabled && styles.disabled, className)}>
			<Stack direction="row" gap={1}>
				<Icon height={40} width={40} className={styles.icon} />

				<Stack gap={1}>
					<h3 className={cn(styles.header, disabled && styles.disabled)}>{header}</h3>
					<p>{description}</p>
				</Stack>
			</Stack>
		</Sheet>
	);

	if (disabled) {
		return content;
	}

	return (
		<Link className={cn(styles.link)} href={href} {...rest}>
			{content}
		</Link>
	);
};
