import type { Metadata, NextPage } from "next";
import { Book } from "@/components/books/Book";
import { BookNavLayout } from "@/components/books/BookNavLayout";

export const metadata: Metadata = {
	title: "Остров Сокровищ"
};

const BookPage: NextPage = () => (
	<BookNavLayout>
		<Book slug="treasure-island" />
	</BookNavLayout>
);

export default BookPage;
