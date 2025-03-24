import { Paragraph } from "@/ui/Paragraph/Paragraph";
import sheetStyles from "@/ui/Sheet/Sheet.module.css";
import { Stack } from "@/ui/Stack/Stack";
import { clsx } from "clsx";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, FC, SVGProps } from "react";
import styles from "./LinkCard.module.css";

interface LinkCardProps extends LinkProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
	Icon: FC<SVGProps<SVGSVGElement>>;
	header: string;
	description: string;
}

export const LinkCard: FC<LinkCardProps> = ({ Icon, header, description, className, ...rest }) => (
	<Link className={clsx(sheetStyles.sheet, styles.linkCard, className)} {...rest}>
		<Stack direction="row" gap={1}>
			<Icon height={40} width={40} style={{ flexShrink: 0 }} />

			<Stack gap={1}>
				<h3 className={clsx(styles.header)}>{header}</h3>
				<Paragraph>
					{description}
				</Paragraph>
			</Stack>
		</Stack>
	</Link>
);
