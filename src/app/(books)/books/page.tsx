import type { Metadata, NextPage } from "next";
import { Book } from "@/app/(books)/books/Book";
import { BookNavLayout } from "@/app/(books)/BookNavLayout";

export const metadata: Metadata = {
	title: "Остров Сокровищ"
};

const BookPage: NextPage = () => (
	<BookNavLayout>
		<Book slug="treasure-island" />
	</BookNavLayout>
);

export default BookPage;
