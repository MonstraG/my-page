import type { PeerObject } from "@/components/video/MySimplePeer";

export interface Participant {
	id: string;
	peer: PeerObject;
	theirStreams: MediaStream[];
}
