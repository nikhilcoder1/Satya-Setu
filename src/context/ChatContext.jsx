import { createContext, useContext, useState, useEffect } from "react";

export const ChatContext = createContext();

const mockPosts = [
  {
    id: 1,
    username: "anonUser1",
    avatar: "🕵️‍♂️",
    title: "Bribery at local office",
    description: "I witnessed bribery happening at the municipal office.",
    votes: 2,
  },
  {
    id: 2,
    username: "anonUser2",
    avatar: "👽",
    title: "School fund misuse",
    description: "Funds allocated for school repairs are being misused.",
    votes: 5,
  },
];

export const ChatProvider = ({ children }) => {
  const [posts, setPosts] = useState(() => {
    try {
      const storedPosts = JSON.parse(localStorage.getItem("posts"));
      return storedPosts && storedPosts.length > 0 ? storedPosts : mockPosts;
    } catch {
      return mockPosts;
    }
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  const upvotePost = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, votes: post.votes + 1 } : post
      )
    );
  };

  const downvotePost = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, votes: post.votes - 1 } : post
      )
    );
  };

  return (
    <ChatContext.Provider value={{ posts, addPost, upvotePost, downvotePost }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);