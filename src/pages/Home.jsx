import { useState } from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { posts, upvotePost, downvotePost } = useChat();
  const { user } = useAuth();
  const [votedPosts, setVotedPosts] = useState({}); // { postId: "up" | "down" }

  const handleUpvote = (postId) => {
    if (!user) return;

    if (votedPosts[postId] === "up") return; // already upvoted
    if (votedPosts[postId] === "down") {
      // remove previous downvote
      downvotePost(postId); // reduce one from downvote previously
    }

    upvotePost(postId);
    setVotedPosts((prev) => ({ ...prev, [postId]: "up" }));
  };

  const handleDownvote = (postId) => {
    if (!user) return;

    if (votedPosts[postId] === "down") return; // already downvoted
    // Prevent negative votes
    const post = posts.find((p) => p.id === postId);
    if (post.votes <= 0) return;

    if (votedPosts[postId] === "up") {
      // remove previous upvote
      upvotePost(postId); // reverse upvote
    }

    downvotePost(postId);
    setVotedPosts((prev) => ({ ...prev, [postId]: "down" }));
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <h1 className="text-3xl mb-6 text-center">Home Feed</h1>
      <div className="flex flex-col space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-gray-900 p-4 rounded border border-green-600"
          >
            <div className="flex items-center mb-2">
              {/* Show post avatar if exists, otherwise fallback to logged-in user avatar */}
              <span className="text-2xl mr-2">
                {post.avatar || user.avatar || "🕵️‍♂️"}
              </span>
              <span className="font-bold">{post.username}</span>
            </div>
            <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
            <p className="mb-2">{post.description}</p>
            <div className="flex items-center space-x-4">
              <button
                className={`px-2 py-1 rounded border ${
                  votedPosts[post.id] === "up" ? "bg-green-500" : "border-green-500"
                }`}
                onClick={() => handleUpvote(post.id)}
              >
                👍 {post.votes}
              </button>
              <button
                className={`px-2 py-1 rounded border ${
                  votedPosts[post.id] === "down" ? "bg-red-500" : "border-green-500"
                }`}
                onClick={() => handleDownvote(post.id)}
              >
                👎
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
