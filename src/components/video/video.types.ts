import type SimplePeer from "./MySimplePeer";

export interface Participant {
	id: string;
	peer: SimplePeer.Instance;
}
