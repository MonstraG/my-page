import type { MySimplePeer } from "@/components/video/MySimplePeer";

export interface Participant {
	id: string;
	peer: MySimplePeer;
	theirStreams: MediaStream[];
}
