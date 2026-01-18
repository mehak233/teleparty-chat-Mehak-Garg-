import { useState, useEffect } from "react";
import { client, eventHandler } from "./src/teleparty/client";
import {
  SocketMessageTypes,
  type SessionChatMessage,
} from "teleparty-websocket-lib/src/index";

type TypingMessageData = {
  anyoneTyping: boolean;
};

type Props = {
  roomId: string;
  nickname: string;
  previousMessages?: SessionChatMessage[];
};

export default function ChatRoom({ roomId, nickname: _nickname, previousMessages }: Props) {
  const [messages, setMessages] = useState<SessionChatMessage[]>(previousMessages || []);
  const [typing, setTyping] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    eventHandler.onMessage = (msg) => {
      // CHAT MESSAGE
      if (msg.type === SocketMessageTypes.SEND_MESSAGE) {
        setMessages((prev) => [...prev, msg.data as SessionChatMessage]);
      }

      // TYPING
      if (msg.type === SocketMessageTypes.SET_TYPING_PRESENCE) {
        const data = msg.data as TypingMessageData;
        setTyping(data.anyoneTyping);
      }
    };
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
      body: text,
    });

    setText("");
  };

  const sendTyping = (state: boolean) => {
    client.sendMessage(SocketMessageTypes.SET_TYPING_PRESENCE, {
      typing: state,
    });
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>

      {/* MESSAGES */}
      <div>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.userNickname ?? "System"}</strong>: {m.body}
          </div>
        ))}
      </div>

      {/* TYPING INDICATOR */}
      {typing && <p style={{ opacity: 0.6 }}>Someone is typing...</p>}

      {/* INPUT */}
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          sendTyping(true);
        }}
        onBlur={() => sendTyping(false)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
