import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../context/ChatContext";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const { messages } = useContext(ChatContext);
  const bottomRef = useRef(null);

  // Auto scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gray-50 p-4 h-[70vh] overflow-y-auto rounded border border-gray-200">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          text={msg.text}
          sender={msg.sender}
          time={msg.time}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}