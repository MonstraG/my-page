import type { FCC } from "@/types/react";
import { ThemeRegistry } from "@/app/(app)/ThemeRegistry/ThemeRegistry";

const BooksLayout: FCC = ({ children }) => (
	<html lang="en">
		<body>
			<ThemeRegistry>{children}</ThemeRegistry>
		</body>
	</html>
);

export default BooksLayout;
