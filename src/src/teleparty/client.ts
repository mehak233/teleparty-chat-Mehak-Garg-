import { TelepartyClient } from "teleparty-websocket-lib/src/TelepartyClient";
import type { SocketEventHandler } from "teleparty-websocket-lib/src/SocketEventHandler";

export const eventHandler: SocketEventHandler = {
  onConnectionReady: () => {
    console.log("Socket connection established");
  },

  onClose: () => {
    alert("Connection closed. Please reload.");
  },

  onMessage: (message) => {
    console.log("Received message:", message);
  },
};

export const client = new TelepartyClient(eventHandler);
