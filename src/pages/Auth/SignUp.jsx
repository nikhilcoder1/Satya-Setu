import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    avatar: "",
  });

  const avatars = ["🕵️‍♂️", "👽", "💀", "🤖", "🧟", "👻"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (avatar) => {
    setFormData({ ...formData, avatar });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || !formData.avatar) {
      toast.error("Please fill all fields and select an avatar");
      return;
    }

    const res = register(formData.username, formData.password, formData.avatar);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success("Account created successfully");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl mb-6">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full max-w-sm bg-gray-900 p-6 rounded-lg"
      >
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          className="p-2 rounded bg-black border border-green-600 text-green-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="p-2 rounded bg-black border border-green-600 text-green-400"
        />

        <div>
          <p className="mb-2">Select Avatar:</p>
          <div className="flex gap-3 justify-between">
            {avatars.map((emoji) => (
              <button
                type="button"
                key={emoji}
                onClick={() => handleAvatarSelect(emoji)}
                className={`text-2xl p-2 border rounded ${
                  formData.avatar === emoji
                    ? "border-green-400"
                    : "border-gray-500"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
        >
          Sign Up
        </button>

        <p className="text-center">
          Already a User?{" "}
          <Link to="/signin" className="text-green-300 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
