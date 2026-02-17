import type { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Props = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const LinkOut: FC<Props> = ({ children, ...rest }) => (
	<a target="_blank" rel="noreferrer" {...rest}>
		{children}
	</a>
);
