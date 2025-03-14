import type SimplePeer from "simple-peer";

export interface Participant {
	id: string;
	peer: SimplePeer.Instance;
}
