"use client";

import type { FCC } from "@/types/react";
import Container from "@mui/joy/Container";
import { useBookControlsStore } from "@/app/(books)/useBookControlsStore";

export const BookLayout: FCC = ({ children }) => {
	const { wide } = useBookControlsStore();

	return <Container maxWidth={wide ? false : "md"}>{children}</Container>;
};
