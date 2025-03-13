import type Peer from "simple-peer";

export interface MessageAssignId {
	yourId: string;
}

export interface MessageAnnouncement {
	fromId: string;
	announce: true;
}

export interface MessageSignal {
	fromId: string;
	toId: string;
	signal: Peer.SignalData;
}

export interface MessageUserLeaves {
	fromId: string;
	bye: true;
}

export type SocketMessage =
	| MessageAssignId
	| MessageAnnouncement
	| MessageSignal
	| MessageUserLeaves;

type MsgCallback = (message: SocketMessage) => void;

export interface MyWebSocket {
	send: (data: unknown) => void;
	cleanup: () => void;
}

export const getWebSocketConnection = (
	messageCallback: MsgCallback,
	roomId: string
): MyWebSocket => {
	const abortController = new AbortController();
	const webSocket = new WebSocket("ws://localhost:8080/ws");

	function send(data: unknown) {
		if (!webSocket) {
			throw new Error("Cannot send to websocket, too early!");
		}
		console.debug("Send message", data);
		webSocket.send(JSON.stringify(data));
	}

	webSocket.addEventListener(
		"open",
		function handleOpen(event) {
			console.debug("Connected to websocket server", event);
			send({ roomId: roomId });
		},
		{ signal: abortController.signal }
	);
	webSocket.addEventListener(
		"close",
		function handleClose(event) {
			console.debug("Closed to websocket server", event);
		},
		{ signal: abortController.signal }
	);
	webSocket.addEventListener(
		"message",
		function handleMessage(event) {
			const message = JSON.parse(event.data);
			console.debug("Received message:", message);
			messageCallback(message);
		},
		{ signal: abortController.signal }
	);
	webSocket.addEventListener(
		"error",
		function handleError(error) {
			console.error("WebSocket error:", error);
		},
		{ signal: abortController.signal }
	);

	return {
		send,
		cleanup: () => {
			abortController.abort("cleaup");
		}
	};
};
