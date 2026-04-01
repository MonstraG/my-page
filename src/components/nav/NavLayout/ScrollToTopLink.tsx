"use client";
import type { FC } from "react";
import { MyClickLink } from "@/ui/MyLink/MyLink";

export const ScrollToTopLink: FC = () => {
	return <MyClickLink onClick={() => scrollTo({ top: 0 })}>Scroll to top</MyClickLink>;
};
