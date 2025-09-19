import type { ReactElement } from "react";

export interface Post {
	title: string;
	slug: string;
	date: string;
	image?: {
		src: string;
		alt: string;
		width: number;
		height: number;
	};
	categories: readonly string[];
	body: ReactElement;
}
