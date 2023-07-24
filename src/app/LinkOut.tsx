import { AnchorHTMLAttributes, DetailedHTMLProps, FC } from "react";

type Props = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export const LinkOut: FC<Props> = (props) => (
	<a target="_blank" rel="noopener noreferrer nofollow ugc" {...props} />
);
