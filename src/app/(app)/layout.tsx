import { Open_Sans } from "next/font/google";
import type { FCC } from "@/types/react";

const openSans = Open_Sans({ subsets: ["latin"] });

const AppLayout: FCC = ({ children }) => <main className={openSans.className}>{children}</main>;

export default AppLayout;
