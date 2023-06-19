import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Arseny Garelyshev's Resume | Full-stack Developer"
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
	<html lang="en">
		<body className={inter.className}>{children}</body>
	</html>
);

export default RootLayout;
