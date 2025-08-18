import { useState, useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { useTranslation } from "react-i18next";
import { sendMessageToBot } from "../services/api";

export default function InputBox() {
  const [input, setInput] = useState("");
  const { addMessage } = useContext(ChatContext);
  const { t } = useTranslation();

  const handleSend = async () => {
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Add user message
    addMessage({ text: input, sender: "user", time });

    setInput("");

    // Get bot reply
    const botReply = await sendMessageToBot(input);
    const botTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    addMessage({ text: botReply, sender: "bot", time: botTime });
  };

  return (
    <div className="flex space-x-2 mt-4">
      <input
        className="flex-1 border border-gray-300 p-2 rounded bg-white"
        placeholder={t("placeholder")}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        onClick={handleSend}
      >
        {t("send")}
      </button>
    </div>
  );
}
