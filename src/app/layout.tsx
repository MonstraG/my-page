import "./globals.scss";
import { Inter } from "next/font/google";
import { FCC } from "@/types/react";

const inter = Inter({ subsets: ["latin"] });

const RootLayout: FCC = ({ children }) => (
	<html lang="en">
		<body className={inter.className}>{children}</body>
	</html>
);

export default RootLayout;
