import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignIn = () => {
  const { login, users } = useAuth(); // users = stored users for demo
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) return;

    // Simple validation against stored users (in memory)
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      login(user.username, user.avatar);
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl mb-6">Sign In</h1>
      <form onSubmit={handleSignIn} className="flex flex-col space-y-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 rounded bg-gray-900 border border-green-600 text-green-400"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-900 border border-green-600 text-green-400"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded">
          Sign In
        </button>
        <p>
          New user?{" "}
          <Link to="/signup" className="text-green-300 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;