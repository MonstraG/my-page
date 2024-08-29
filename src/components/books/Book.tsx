import type { FC } from "react";
import { getBook } from "@/components/books/getBook";

interface Props {
	slug: string;
}

export const Book: FC<Props> = async ({ slug }) => {
	const book = await getBook(slug);
	return <div dangerouslySetInnerHTML={{ __html: book }} />;
};
