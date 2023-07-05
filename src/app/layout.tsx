import "./globals.css";
import { Inter } from "next/font/google";
import { FCC } from "@/types/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Arseny Garelyshev's Resume | Full-stack Developer",
	description: "CV page for Arseny Garelyshev, a full-stack developer."
};

const RootLayout: FCC = ({ children }) => (
	<html lang="en">
		<body className={inter.className}>{children}</body>
	</html>
);

export default RootLayout;
