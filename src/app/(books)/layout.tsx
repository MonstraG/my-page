import type { FCC } from "@/types/react";
import { ThemeRegistry } from "@/app/(app)/ThemeRegistry/ThemeRegistry";

// lang must match book's language for hyphenation to work
const BooksLayout: FCC = ({ children }) => (
	<html lang="ru">
		<body>
			<ThemeRegistry>{children}</ThemeRegistry>
		</body>
	</html>
);

export default BooksLayout;
