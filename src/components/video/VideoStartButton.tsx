"use client";
import type { FC } from "react";
import { Button } from "@/ui/Button/Button";
import { useRouter } from "next/navigation";

export const VideoStartButton: FC = () => {
	const router = useRouter();

	const onClick = () => {
		router.push(`/video/${self.crypto.randomUUID()}`);
	};

	return <Button onClick={onClick}>Create new room</Button>;
};
