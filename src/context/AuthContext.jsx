import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const login = (username, password) => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      setUser({ username: foundUser.username, avatar: foundUser.avatar });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  // Register new user and log them in
  const register = (username, password, avatar) => {
    if (users.some((u) => u.username === username)) {
      return { success: false, message: "Username already exists!" };
    }

    const newUser = { username, password, avatar };
    setUsers((prev) => [...prev, newUser]);
    setUser({ username, avatar });
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, users, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
