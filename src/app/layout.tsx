import type { FCC } from "@/types/react";

const RootLayout: FCC = ({ children }) => (
	<html lang="en">
		<body>{children}</body>
	</html>
);

export default RootLayout;
