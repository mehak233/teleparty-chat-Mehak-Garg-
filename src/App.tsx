import { useEffect, useState } from "react";
import { eventHandler } from "./src/teleparty/client";
import type { SessionChatMessage } from "teleparty-websocket-lib/src/index";
import Home from "./Home";
import ChatRoom from "./ChatRoom";

function App() {
  const [connected, setConnected] = useState(false);
  const [roomData, setRoomData] = useState<{ roomId: string; nickname: string; previousMessages?: SessionChatMessage[] } | null>(null);

  useEffect(() => {
    eventHandler.onConnectionReady = () => {
      console.log("Websocket ready");
      setConnected(true);
    };

    eventHandler.onClose = () => {
      alert("Socket closed. Reload.");
    };
  }, []);

  if (!connected) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2 className="loading-text">Connecting...</h2>
      </div>
    );
  }

  if (!roomData) {
    return (
      <Home
        onEnterRoom={(roomId, nickname, previousMessages) => setRoomData({ roomId, nickname, previousMessages })}
      />
    );
  }

  return <ChatRoom roomId={roomData.roomId} nickname={roomData.nickname} previousMessages={roomData.previousMessages} />;
}

export default App;
