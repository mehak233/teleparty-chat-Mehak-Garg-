import { useState } from "react";
import { client } from "./src/teleparty/client";
import "./Home.css";

type Props = {
  onEnterRoom: (roomId: string, nickname: string) => void;
};

export default function Home({ onEnterRoom }: Props) {
  const [nickname, setNickname] = useState("");
  const [roomId, setRoomId] = useState("");
  const [userIcon, setUserIcon] = useState("");

  const createRoom = async () => {
    if (!nickname.trim()) return;
    const id = await client.createChatRoom(nickname, userIcon);
    onEnterRoom(id, nickname);
  };

  const joinRoom = async () => {
    if (!nickname.trim() || !roomId.trim()) return;
    await client.joinChatRoom(nickname, roomId, userIcon);
    onEnterRoom(roomId, nickname);
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">
          <span className="title-icon">💬</span>
          Teleparty Chat
        </h1>
        <p className="home-subtitle">Connect with friends in real-time</p>

        <div className="form-section">
          <div className="input-group">
            <label htmlFor="nickname">Nickname</label>
            <input
              id="nickname"
              className="styled-input"
              placeholder="Enter your nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && nickname.trim() && createRoom()}
            />
          </div>

          <div className="input-group">
            <label htmlFor="userIcon">User Icon (optional)</label>
            <input
              id="userIcon"
              className="styled-input"
              placeholder="Image URL"
              value={userIcon}
              onChange={(e) => setUserIcon(e.target.value)}
            />
          </div>

          <button 
            className="btn btn-primary" 
            onClick={createRoom}
            disabled={!nickname.trim()}
          >
            <span>✨</span> Create New Room
          </button>
        </div>

        <div className="divider">
          <span>or</span>
        </div>

        <div className="form-section">
          <div className="input-group">
            <label htmlFor="roomId">Room ID</label>
            <input
              id="roomId"
              className="styled-input"
              placeholder="Enter room ID to join"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && nickname.trim() && roomId.trim() && joinRoom()}
            />
          </div>

          <button 
            className="btn btn-secondary" 
            onClick={joinRoom}
            disabled={!nickname.trim() || !roomId.trim()}
          >
            <span>🚪</span> Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
