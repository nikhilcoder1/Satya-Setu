export default function MessageBubble({ text, sender, time }) {
  const isUser = sender === "user";
  return (
    <div
      className={`w-full rounded border shadow-sm p-3 my-2 text-sm ${
        isUser
          ? "bg-white border-blue-300"
          : "bg-white border-gray-300"
      }`}
    >
      <p className="text-gray-800 leading-relaxed">{text}</p>
      <span className="text-xs text-gray-500 block mt-1">{time}</span>
    </div>
  );
}