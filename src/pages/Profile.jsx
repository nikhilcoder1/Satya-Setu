import { useAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const { posts } = useChat();
  const navigate = useNavigate();

  const userPosts = posts.filter((post) => post.username === user.username);
  const totalUpvotes = userPosts.reduce((acc, post) => acc + post.votes, 0);

  // Helper to detect if avatar is an emoji or URL
  const isEmoji = (str) => {
    return /\p{Extended_Pictographic}/u.test(str);
  };

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        {/* User Info */}
        <div className="flex items-center space-x-4 mb-6">
          {isEmoji(user.avatar) ? (
            <span className="text-6xl">{user.avatar}</span>
          ) : (
            <img
              src={user.avatar || "https://i.pravatar.cc/150?img=default"}
              alt="Avatar"
              className="w-16 h-16 rounded-full border-2 border-green-500"
            />
          )}
          <div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            <p>Total Complaints: {userPosts.length}</p>
            <p>Total Upvotes: {totalUpvotes}</p>
          </div>
        </div>

        {/* User Complaints */}
        <h2 className="text-xl mb-4">Your Complaints</h2>
        <div className="space-y-4">
          {userPosts.length === 0 ? (
            <p className="text-green-300">You haven’t submitted any complaints yet.</p>
          ) : (
            userPosts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-900 p-4 rounded shadow hover:shadow-lg transition"
              >
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-green-300 mt-1">{post.description}</p>
                <p className="mt-2 text-sm">Upvotes: {post.votes}</p>
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => navigate("/home")}
          className="mt-6 px-4 py-2 bg-green-500 hover:bg-green-600 rounded"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Profile;