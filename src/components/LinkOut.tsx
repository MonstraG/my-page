import type { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Props = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const LinkOut: FC<Props> = ({ children, ...rest }) => (
	<a target="_blank" rel="noopener noreferrer nofollow ugc" {...rest}>
		{children}
	</a>
);
