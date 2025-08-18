import { useState, useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const botQuestions = [
  "Hello! Please briefly describe your complaint.",
  "Can you provide more details about the issue?",
  "Where and when did this happen?",
];

const CreatePost = () => {
  const { addPost, posts } = useChat();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([{ from: "bot", text: "" }]);
  const [currentBotText, setCurrentBotText] = useState(botQuestions[0]);
  const [displayedBotText, setDisplayedBotText] = useState("");
  const [input, setInput] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [chatEnded, setChatEnded] = useState(false);

  const inputRef = useRef(null);
  const canvasRef = useRef(null);
  const columnsRef = useRef([]);
  const animationRef = useRef(null);

  // Animated bot typing effect
  useEffect(() => {
    let index = 0;
    setDisplayedBotText("");
    const interval = setInterval(() => {
      if (index < currentBotText.length) {
        setDisplayedBotText((prev) => prev + currentBotText[index]);
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev.slice(0, -1), { from: "bot", text: currentBotText }]);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [currentBotText]);

  // Auto-scroll window
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    if (inputRef.current) inputRef.current.focus();
  }, [messages, displayedBotText]);

  // Handle sending messages
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");

    if (currentQuestion < botQuestions.length) {
      setTimeout(() => {
        setCurrentBotText(botQuestions[currentQuestion]);
        setMessages((prev) => [...prev, { from: "bot", text: "" }]);
        setCurrentQuestion((prev) => prev + 1);
      }, 700);
    } else {
      setTimeout(() => {
        setChatEnded(true);
        const description = messages
          .filter((msg) => msg.from === "user")
          .map((msg) => msg.text)
          .concat(userInput)
          .join(" ");

        const newPost = {
          id: posts.length + 1,
          username: user.username,
          avatar: user.avatar,
          title: description.length > 30 ? description.slice(0, 30) + "..." : description,
          description,
          votes: 0,
        };
        addPost(newPost);
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleBackHome = () => {
    navigate("/home");
  };

  // MATRIX BACKGROUND EFFECT
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    columnsRef.current = drops;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&*+-/".split("");

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className="bg-black text-green-400 font-mono flex flex-col h-screen relative overflow-hidden">
      {/* Canvas Matrix background */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10"></canvas>

      <h1 className="text-3xl text-center p-4 text-green-300 tracking-wider z-10 relative">
        Create Complaint
      </h1>

      {/* Chat messages */}
      <div className="flex-1 flex flex-col p-4 space-y-2 z-10 relative">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex transition-all duration-300 ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded max-w-xs break-words ${
                msg.from === "user"
                  ? "bg-green-500 text-black"
                  : "bg-gray-900 text-green-400 animate-fade-in"
              }`}
            >
              {msg.from === "bot" && msg.text === "" ? displayedBotText : msg.text}
            </div>
          </div>
        ))}
      </div>

      {!chatEnded && (
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="p-4 bg-black border border-green-600 text-green-400 w-full resize-none focus:outline-none focus:ring-2 focus:ring-green-500 z-10 relative"
        />
      )}

      {chatEnded && (
        <button
          onClick={handleBackHome}
          className="m-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded self-center tracking-wider z-10 relative"
        >
          Back to Home
        </button>
      )}
    </div>
  );
};

export default CreatePost;