import type { NextPage } from "next";
import { Book } from "@/app/(books)/books/Book";
import { BookLayout } from "@/app/(books)/books/BookControls";
import { ThemeRegistry } from "@/app/(app)/ThemeRegistry/ThemeRegistry";
import { BookNavLayout } from "@/app/(books)/BookNavLayout";

const BookPage: NextPage = () => (
	<html lang="en">
		<body>
			<ThemeRegistry>
				<BookNavLayout>
					<BookLayout>
						<Book slug="treasure-island" />
					</BookLayout>
				</BookNavLayout>
			</ThemeRegistry>
		</body>
	</html>
);

export default BookPage;
