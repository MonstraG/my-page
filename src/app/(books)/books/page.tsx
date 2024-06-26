import type { NextPage } from "next";
import { Book } from "@/app/(books)/books/Book";
import { BookNavLayout } from "@/app/(books)/BookNavLayout";

const BookPage: NextPage = () => (
	<BookNavLayout>
		<Book slug="treasure-island" />
	</BookNavLayout>
);

export default BookPage;
