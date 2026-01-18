import { useEffect, useState } from "react";
import { eventHandler } from "./src/teleparty/client";
import Home from "./Home";
import ChatRoom from "./ChatRoom";

function App() {
  const [connected, setConnected] = useState(false);
  const [roomData, setRoomData] = useState<{ roomId: string; nickname: string } | null>(null);

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
        onEnterRoom={(roomId, nickname) => setRoomData({ roomId, nickname })}
      />
    );
  }

  return <ChatRoom roomId={roomData.roomId} nickname={roomData.nickname} />;
}

export default App;
