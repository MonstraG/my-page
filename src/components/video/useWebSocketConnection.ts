import type Peer from "simple-peer";

export interface IdAssignmentMessage {
	yourId: string;
}

export interface AnnouncementMessage {
	fromId: string;
	announce: true;
}

export interface SignalMessage {
	fromId: string;
	toId: string;
	signal: Peer.SignalData;
}

export interface ParticipantLeavesMessage {
	fromId: string;
	bye: true;
}

const websocketUri = process.env.NEXT_PUBLIC_WEBSOCKET_URI;

export type SocketMessage =
	| IdAssignmentMessage
	| AnnouncementMessage
	| SignalMessage
	| ParticipantLeavesMessage;

type MessageCallback = (message: SocketMessage) => void;

export interface MyWebSocket {
	send: (data: unknown) => void;
	cleanup: () => void;
	setMessageCallback: (callback: MessageCallback) => void;
}

export const getWebSocketConnection = (roomId: string): MyWebSocket => {
	if (websocketUri == null) {
		throw new Error("No websocket uri set!");
	}

	const abortController = new AbortController();
	const webSocket = new WebSocket(websocketUri);
	let messageCallback: MessageCallback = (message) => {
		throw new Error(
			"Received message but no callback registered yet! " + JSON.stringify(message),
		);
	};

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
		{ signal: abortController.signal },
	);
	webSocket.addEventListener(
		"close",
		function handleClose(event) {
			console.debug("Closed to websocket server", event);
		},
		{ signal: abortController.signal },
	);
	webSocket.addEventListener(
		"message",
		function handleMessage(event) {
			const message = JSON.parse(event.data);
			console.debug("Received message:", message);
			messageCallback(message);
		},
		{ signal: abortController.signal },
	);
	webSocket.addEventListener(
		"error",
		function handleError(error) {
			console.error("WebSocket error:", error);
		},
		{ signal: abortController.signal },
	);

	return {
		send,
		cleanup: () => {
			abortController.abort("cleanup");
		},
		setMessageCallback: (callback: MessageCallback) => {
			messageCallback = callback;
		},
	};
};
