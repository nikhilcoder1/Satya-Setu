import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ChatProvider } from "./context/ChatContext";
import { Toaster } from "react-hot-toast";

const AppLayout = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // Hide Navbar on auth pages
  const hideNavbar = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && user && <Navbar />}
      {children}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            {/* Redirect root path to /signin */}
            <Route path="/" element={<Navigate to="/signin" replace />} />

            <Route
              path="/signin"
              element={
                <AppLayout>
                  <SignIn />
                </AppLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <AppLayout>
                  <SignUp />
                </AppLayout>
              }
            />
            <Route
              path="/home"
              element={
                <AppLayout>
                  <Home />
                </AppLayout>
              }
            />
            <Route
              path="/create-post"
              element={
                <AppLayout>
                  <CreatePost />
                </AppLayout>
              }
            />
            <Route
              path="/profile/:username"
              element={
                <AppLayout>
                  <Profile />
                </AppLayout>
              }
            />
            <Route
              path="*"
              element={
                <AppLayout>
                  <NotFound />
                </AppLayout>
              }
            />
          </Routes>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}
