import type { SvgIcon } from "@/icons/icon.type";
import { Sheet } from "@/ui/Sheet/Sheet";
import { Stack } from "@/ui/Stack/Stack";
import { clsx } from "clsx";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, FC } from "react";
import styles from "./LinkCard.module.css";

interface LinkCardProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	Icon: SvgIcon;
	header: string;
	description: string;
	disabled?: boolean;
}

export const LinkCard: FC<LinkCardProps> = ({
	Icon,
	header,
	description,
	className,
	disabled,
	...rest
}) => {
	const content = (
		<Sheet className={clsx(styles.cardSheet, disabled && styles.disabled, className)}>
			<Stack direction="row" gap={1}>
				<Icon height={40} width={40} className={styles.icon} />

				<Stack gap={1}>
					<h3 className={clsx(styles.header, disabled && styles.disabled)}>{header}</h3>
					<p>{description}</p>
				</Stack>
			</Stack>
		</Sheet>
	);

	if (disabled) {
		return content;
	}

	return (
		<Link className={clsx(styles.link)} {...rest}>
			{content}
		</Link>
	);
};
